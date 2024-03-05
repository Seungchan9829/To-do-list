import { Link, useNavigate } from "react-router-dom"
import "./Navbar.css"
import axios from "axios"


export default function Navbar(){
    const navigate = useNavigate();
    const handleLogout = async() => {
        try{
            await axios.post('http://localhost:4000/logout');

            localStorage.removeItem('accessToken');
            navigate('/login');
            
        }
        catch(error){
            console.error('로그아웃 실패');
        }
    }
    
    return(
        <nav className="navbar">
            <ul className="navlist">
                <li className="nav-item">
                    <Link to="/">To-Do-List</Link>
                </li>
                <li className="nav-item">
                    <Link to="/exercise">운동</Link>
                </li>
                <li className="nav-item">
                    <Link to="/study">공부</Link>
                </li>
                <li className="nav-item">
                    <button className="nav-button" onClick={handleLogout}>로그아웃</button>
                </li>
            </ul>
        </nav>
    )
}