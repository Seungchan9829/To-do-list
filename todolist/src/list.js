import {React, useState} from'react';

export default function List(){
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const currentDate = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토']
    const datofweek = week[currentDate.getDay()];
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('ko-KR', options);
    const [completedTasks, setCompletedTasks] = useState([]);
    let count = completedTasks.filter(element => false ===element).length;
    const addTask = ()=>{
        if(newTask.trim() !== '') {
            setTasks([...tasks, newTask]);
            setNewTask('');
            setCompletedTasks([...completedTasks, false]);
        }
    };

    const toggle = (index) => {
        const newCompltedTasks = [...completedTasks];
        newCompltedTasks[index] = !newCompltedTasks[index];
        setCompletedTasks(newCompltedTasks);
    }
    const removeTask = (index)=>{
        const newTasks = [...tasks];
        const newCompltedTasks = [...completedTasks];
        newTasks.splice(index,1);
        newCompltedTasks.splice(index,1);
        setTasks(newTasks);
        setCompletedTasks(newCompltedTasks);
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