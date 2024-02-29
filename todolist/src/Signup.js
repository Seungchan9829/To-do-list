import { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

export default function Signup(){
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassweord] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e)=> {
        e.preventDefault();
        console.log(e.target[0].value) // 
        const data = {
            name : e.target[0].value,
            email : e.target[1].value,
            password : e.target[2].value
        }
        // 서버로 값 보내기
        try {
            const result = await axios.post(`http://localhost:4000/signup`, data);
            console.log(result)
            alert('회원가입이 완료되었습니다!');
            navigate('/login');
        }
        catch(error){
            console.log(error);
            if(error.response && error.response.status === 409){
                alert('중복된 이메일 입니다.')
            }
            else{
                alert('회원 가입 오류 발생');
            }
        }
        
        
        
    }
    return(
        <div>
            <div className="wrapper">
                <div className="signup-wrppaer">
                <form onSubmit={handleSubmit}>
                    <h1>회원가입</h1>
                    <div className="input-box">
                    <input type="text" value = {name} onChange={(e)=> setName(e.target.value)} placeholder="이름" required/>
                    </div>
                    <div className="input-box">
                        <input type="email" value = {email} onChange={(e)=> setEmail(e.target.value)} placeholder="아이디" required/>
                    </div>
                    <div className="input-box">
                        <input type = "password" value = {password} onChange={(e)=> setPassweord(e.target.value)} placeholder = "비밀번호" required/>
                    </div>
                    <div>
                        <button type="submit">가입</button>
                    </div>
                </form>
                </div>      
            </div>
        </div>
        
    )
}