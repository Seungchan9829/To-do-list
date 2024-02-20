import './Login.css';
import { FaUser } from "react-icons/fa";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';

export default function Login(){
    return(
        <div className='wrapper'>
            <div className='login-wrapper'>
                <form>
                    <h1>Login</h1>
                    <div className='input-box'>
                        <input type='text' placeholder='아이디' required/>
                        <FaUser className='icon'/>
                    </div>
                    <div className='input-box'>
                        <input type = 'password' placeholder='비밀번호' required/>
                        <RiLockPasswordFill className='icon'/>
                    </div>
                    <div className='login-keep'>
                        <label><input type = "checkbox"/>로그인 상태 유지</label>                       
                    </div>
                    <button type = "submit">로그인</button>
                </form>
            </div>

            <div className='find-wrapper'>
                <ul>
                    <li><Link>비밀번호 찾기</Link></li>
                    <li><Link>아이디 찾기</Link></li>
                    <li><Link>회원가입</Link></li>
                </ul>
            </div>
        </div>
    )
}