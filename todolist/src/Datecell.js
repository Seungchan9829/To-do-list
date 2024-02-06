import React from 'react';
import './DateCell.css'


export default function DateCell({date, attended, onToggle}) {
    return(
        <div className={`date-cell ${attended ? `attended` : ''}`} onClick={onToggle}>
            {date}일
        </div>
    )
}