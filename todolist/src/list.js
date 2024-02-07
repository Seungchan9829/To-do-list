import {React, useEffect, useState} from'react';

export default function List({type}){
    
    const [tasks, setTasks] = useState([]);
    const [completedTasks, setCompletedTasks] = useState([]);
    // 로컬 스토리지에서 데이터를 가지고 옵니다
    // 렌더링 될 때 한번만 실행 빈 배열이기 떄문
    useEffect(()=> {
        const storedTasks = JSON.parse(localStorage.getItem(`tasks_${type}`)) || [];
        setTasks(storedTasks);
        const storedCompletedTasks = JSON.parse(localStorage.getItem(`completedTasks_${type}`)) || [];
        setCompletedTasks(storedCompletedTasks);
    },[])

    const [newTask, setNewTask] = useState('');
    // 날짜 관련 변수
    const currentDate = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토']
    const datofweek = week[currentDate.getDay()];
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('ko-KR', options);
    
    // 
    
    let count = completedTasks.filter((task,index) => !completedTasks[index]).length;
    
    //작업을 추가합니다.
    const addTask = ()=>{
        if(newTask.trim() !== '') {
            // 새로운 할 일을 추가합니다.
            setTasks([...tasks, newTask]);
            localStorage.setItem(`tasks_${type}`, JSON.stringify([...tasks, newTask]))
            setNewTask('');
            setCompletedTasks([...completedTasks, false]);
            localStorage.setItem(`completedTasks_${tasks}`, JSON.stringify([...completedTasks, false]));
        }
    };
    
    // 할일을 완료하면 문장 가운데 줄을 긋습니다.
    const toggle = (index) => {
        const newCompltedTasks = [...completedTasks];
        newCompltedTasks[index] = !newCompltedTasks[index];
        setCompletedTasks(newCompltedTasks);
        localStorage.setItem(`completedTasks_${tasks}`, JSON.stringify(newCompltedTasks));
    }
    const removeTask = (index)=>{
        // 변수 선언
        const newTasks = [...tasks];
        const newCompltedTasks = [...completedTasks];
        // 삭제 
        newTasks.splice(index,1);
        newCompltedTasks.splice(index,1);
        // 변수 재설정
        setTasks(newTasks);
        localStorage.setItem(`tasks_${tasks}`, JSON.stringify(newTasks));

        setCompletedTasks(newCompltedTasks);
        localStorage.setItem(`completedTasks_${tasks}`, JSON.stringify(newCompltedTasks))
    }

    return(
        <>
        
        <div className="container">
            <h1>{formattedDate}</h1>
            <div className="day">{datofweek}요일</div>
            <div className="task-left">할 일 {count}개 남음</div>
        </div>

        <div className="todo-container">
            <div>
                <input
                    type="text"
                    value={newTask}
                    onChange={(e)=> setNewTask(e.target.value)}/>
                <button onClick={addTask}>할일 추가</button>    
            </div>
            <div className="todolist">
                {tasks.map((task, index) => (
                    <div className="todoItem">
                    <input type="checkbox" className = "checkbox" checked={completedTasks[index]} onChange={()=>toggle(index)}/>
                    <li key ={index}>
                        
                        <h2 className={`${completedTasks[index] ? 'completed' : ''}`}>{task}</h2>
                    </li>
                    <button onClick={()=> removeTask(index)}>삭제</button>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}