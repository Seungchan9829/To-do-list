const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const pg = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const conString = "postgres://szvwidna:ScLy3yxV3D93Y3qsKI7-QDf544LHc2gH@arjuna.db.elephantsql.com/szvwidna"
const client = new pg.Client(conString);



client.connect(function(err) {
  if (err) {
    return console.error('could not connect to postgres', err);
  }
  console.log('Connected to PostgreSQL database');

  // client.end(); // Don't end the client here if you need it for subsequent queries
});

app.get('/task', (req, res) => {
  client.query('SELECT * FROM "to-do-list"."users"', function(err, result) {
    if (err) {
      return console.error('error running query', err);
    }
    res.json(result.rows); // Only send the rows as JSON
  });
});


// 데이터 베이스에서 할 일을 가져오는 API
app.get('/tasks/:type', (req,res) => {
  // :type는 동적 매개변수로 취급 된다. req.params.type은 :type으로 대치된다.
  const taskType = req.params.type;
  // === 비교 연산자임
  if( taskType === 'exercise'){
    client.query('SELECT todo_id, todo_contents, todo_completed, category_id FROM "to-do-list"."todo" where category_id = 1 ORDER BY todo_id;', function(err, result){
      if(err){
        return console.error('error running query', err);
      }
      // 배열을 반환한다.
      res.json(result.rows);
    })
  }
  else {
    client.query('SELECT todo_id, todo_contents, todo_completed, category_id FROM "to-do-list"."todo" where category_id = 2 ORDER BY todo_id;', function(err, result){
      if(err){
        return console.error('error running query', err);
      }
      // 배열을 반환한다.
      res.json(result.rows);
    })
  }
})

app.post('/task/:type', async (req, res) => {
  const { todo_contents, todo_completed, category_id} = req.body;
  
  try{
    const result = await client.query('INSERT INTO "to-do-list"."todo" (todo_contents, todo_completed, category_id) VALUES ($1, $2, $3)',
    [todo_contents, todo_completed, category_id])

    res.send("데이터베이스 저장 완료")
  }
  catch(error){
    console.error('error',error);

  }
});

app.put('/task/:type', async (req,res) => {
  const {todo_id} = req.body;
  res.send(`${todo_id}`);  
  try{
    await client.query(`UPDATE "to-do-list"."todo" SET todo_completed = NOT todo_completed WHERE todo_id = ${todo_id}`)

  }
  catch(error){
    console.error(error);
  }
})

app.delete('/task/:type/:todo_id', async (req,res) => {
  const todo_id = req.params.todo_id;
  try{
    await client.query(`DELETE FROM "to-do-list"."todo" WHERE todo_id = ${todo_id}`)
  }
  catch(error){
    console.error(error);
  }
})

app.post('/signup', async(req,res) => {
  try{
    const {name, email, password} = req.body;
    // 비밀번호 bcrypt를 이용하여 암호화.
      const hash =  await bcrypt.hash(password, 10);
      // Store hash in your password DB.
      const result = await client.query('INSERT INTO "to-do-list"."users" (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hash]);

      res.send("회원가입이 완료");
  }
  catch(err){
    return res.status(409).json({error : "중복된 이메일 주소입니다."})
  }
})

app.post('/login', async(req,res) => {
  try{
    const {email, password} = req.body;
    const result = await client.query(`SELECT email, password  FROM "to-do-list"."users" WHERE email ='${email}';`);
    const user = result.rows[0].email;
    const hash = result.rows[0].password;
    if(!user){
      return res.status(401).send("회원이 존재 하지 않습니다.")
    }
    
    bcrypt.compare(password, hash, function(err,result){
      if(!result){
        return res.status(401).send("비밀번호가 일치하지 않습니다.")
      }
      
      //jwt 토큰 발행
      const accessToken = jwt.sign({user_email : email}, "SecretKey", {expiresIn: '15m'});
      res.json({ accessToken });
    }) 

  }
  
  catch(err){
    console.error(err);
  }
})

app.post('/logout', async(req,res) => {
  res.status(200).json("로그아웃이 완료되었습니다.")
})


// 토큰을 검증하는 api
app.get('/authenticate', (req, res) => {
  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json("토큰이 제공되지 않았습니다.");
  }

  jwt.verify(token, "SecretKey", (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json("토큰이 만료되었습니다.");
      }
      return res.status(403).json("유효하지 않은 토큰입니다.");
    }
    res.json({ user });
  });
});

// 사용 x
// 토큰을 인증하는 함수
function authenticateToken(req, res){
  const authHeader = req.authHeader['authorization'];
  if(authHeader){
    const token = authHeader.split(" ")[1];

    jwt.verify(token,"SecretKey", (err, user) => {
      if(err){
        return res.status(403).json("토큰이 만료되었습니다.")
      }
      req.user = user;
      next();
    })
  }
  else{
    // 401 코드는 클라이언트가 인증되지 않았음을 나타낸다.
    res.status(401).json("인증되지 않은 사용자입니다.")
  }
}








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
