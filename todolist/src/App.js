import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import {BrowserRouter as Router, Routes,Route,Link, BrowserRouter} from 'react-router-dom';
import Navbar from './Navbar';
import Main from './main';
import Study from './Study';
import Exercise from './Exercise';
import Login from './Login';


export default function App(){
  return(
    <div>
     <Routes>
      <Route path="/" element={<Main/>}></Route>
      <Route path="/exercise" element={<Exercise/>}></Route>
      <Route path ="/study" element={<Study/>}></Route>
      <Route path = "/login" element = {<Login/>}></Route>
     </Routes>
    </div>
    
  )
}