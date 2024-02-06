import { Link } from "react-router-dom"
import "./Navbar.css"

export default function Navbar(){
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
                    <Link to="study">공부</Link>
                </li>
            </ul>
        </nav>
    )
}