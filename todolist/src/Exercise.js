import React from "react"
import { useState } from "react"
import "./Exercise.css";
import List from "./list";
import Navbar from "./Navbar";
export default function Exercise(){
    return(
        <div>
            <Navbar/>
            <List type = 'exercise'/>
        </div>      
         
    )
}
