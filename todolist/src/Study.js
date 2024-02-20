import {React, useState} from 'react'
import List from './list'
import Navbar from './Navbar'

export default function Study(){
    return(
        <div>
            <Navbar/>
            <List type = 'study'/>
        </div>
        
    )
}