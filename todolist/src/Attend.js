import {React, useState, useEffect} from 'react'
import DateCell from './Datecell';
import './DateCell.css'

export default function Attend(){
    const [attendance, setAttendance] = useState([]);
    
    // 처음 렌더링 될 때만 실행 된다.
    useEffect(() => {
        // 로컬 스토리지에서 저장된 출석 정보를 가져옵니다.
        // 출석 정보가 없다면 빈 배열을 가져옵니다.   
        const storedAttendance = JSON.parse(localStorage.getItem('attendance')) || [];
        // 로컬 스토리지에서 저장된 출석 정보를 다시 attendance에 저장합니다.
        setAttendance(storedAttendance);
    }, []);

    // 참여 확인 여부 작성
    const toggleAttendance = (index) => {
        const updatedAttendance = [...attendance];
        updatedAttendance[index] = !updatedAttendance[index];
        setAttendance(updatedAttendance); // 참석 여부 설정
        localStorage.setItem('attendance', JSON.stringify(updatedAttendance))
    }

    return(
        //
        <div>
            <h1>30일 출석체크</h1>
            <div className='attendance-grid'>  
                {[...Array(30)].map((_, index) => (
                    <DateCell
                        key = {index}
                        date = {index + 1}
                        attended={attendance[index] || false}
                        onToggle={()=> toggleAttendance(index)}
                    />
                ))}
            </div>
        </div>
    )
}