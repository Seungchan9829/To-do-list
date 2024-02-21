const express = require('express')
const app = express()
const port = 4000
const cors = require('cors');
const pg = require('pg');
const bcrypt = require('bcrypt');

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
    console.log(result.rows);
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
      console.log(result.rows)
    })
  }
  else {
    client.query('SELECT todo_id, todo_contents, todo_completed, category_id FROM "to-do-list"."todo" where category_id = 2 ORDER BY todo_id;', function(err, result){
      if(err){
        return console.error('error running query', err);
      }
      // 배열을 반환한다.
      res.json(result.rows);
      console.log(result.rows)
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
  console.log(`${todo_id}`)
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
    bcrypt.hash(password, 10, function(err, hash) {
      // Store hash in your password DB.
      client.query('INSERT INTO "to-do-list"."users" (name, email, password) VALUES ($1, $2, $3)',
      [name, email, hash]);
  });
  }
  catch(err){
    console.error(err);
  }

  res.send("회원 가입 완료");
})








app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
