import './Main.css';
import Attend from './Attend';
import Navbar from './Navbar';


export default function Main(){
    return(
        <div className="container">
            <Navbar/>
            <Attend/>
        </div>
    )
}