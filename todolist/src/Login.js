import './Login.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
export default function Login(){
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = {
            email : e.target[0].value,
            password : e.target[1].value
        }

        try{
            const result = await axios.post(`http://localhost:4000/login`, data);
            const accessToken = result.data.accessToken;

            localStorage.setItem('accessToken', accessToken);

            navigate('/');
        }
        catch(error){
            if(error.response && (error.response.status === 401 || error.response.status === 403 )){
                alert('아이디 또는 비밀번호가 일치하지 않습니다.')
            }
            else{
                alert('로그인 오류 발생');
            }
        }
       
    }
    
    return(
        <div className='wrapper'>
            <div className='login-wrapper'>
                <form onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='아이디' required/>
                        <FaUser className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input type = 'password' placeholder='비밀번호' required/>
                        <RiLockPasswordFill className='icon'/>
                    </div>
                    
                    <button type = "submit">로그인</button>
                </form>
            </div>

            <div className='find-wrapper'>
                <ul>
                    <li><Link>비밀번호 찾기</Link></li>
                    <li><Link>아이디 찾기</Link></li>
                    <li><Link to ='/signup'>회원가입</Link></li>
                </ul>
            </div>
        </div>
    )
}