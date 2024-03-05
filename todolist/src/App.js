import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import {BrowserRouter as Router, Routes,Route,Link, BrowserRouter, useLocation, useNavigate} from 'react-router-dom';
import Navbar from './Navbar';
import Main from './main';
import Study from './Study';
import Exercise from './Exercise';
import Login from './Login';
import Signup from './Signup';
import axios from 'axios';

export default function App(){
  const navigate = useNavigate();  
  useEffect(()=>{
      const accessToken = localStorage.getItem('accessToken');
      
      const fetchData = async ()=>{
        try{
          const response = await axios.get('http://localhost:4000/authenticate',{
            headers : {
              authorization : `Bearer ${accessToken}`
            }
          });

        }
        catch(error){
          if(error.response && (error.response.status === 401 || error.response.status === 403)){
            navigate('/login');
          }
        }
      }
      fetchData();
      
    }, [navigate]);
  return(
    <div>
     <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="/exercise" element={<Exercise/>}></Route>
      <Route path ="/study" element={<Study/>}></Route>
      <Route path = "/login" element = {<Login/>}></Route>
      <Route path = "/signup" element = {<Signup/>}></Route>
     </Routes>
  
    </div>
    
  )
}