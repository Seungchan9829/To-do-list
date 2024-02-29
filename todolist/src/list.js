import {React, useEffect, useState} from'react';
import axios from "axios";
import './Exercise.css';
export default function List({type}){
    

    const [tasks, setTasks] = useState([]);
    
    const [taskCount, setTaskCount] = useState(0);
    // 로컬 스토리지에서 데이터를 가지고 옵니다
    // 렌더링 될 때 한번만 실행 빈 배열이기 떄문
    useEffect(()=> {

        getTask(); // 할일 가져오기
  
    },[])

    const [newTask, setNewTask] = useState('');
    // 날짜 관련 변수
    const currentDate = new Date();
    const week = ['일', '월', '화', '수', '목', '금', '토']
    const datofweek = week[currentDate.getDay()];
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = currentDate.toLocaleDateString('ko-KR', options);
    
    
    //작업을 추가합니다.
    const addTask = async ()=>{
        if(newTask.trim() !== '') {
            // 새로운 할 일을 추가합니다.
            const transferData = {
                todo_contents : `${newTask}`,
                todo_completed : false,
                category_id : type === 'exercise' ? 1 : 2
            };

            setTasks([...tasks, newTask]);
            await createTask(transferData);
               
            setNewTask('');
            getTask();
            
        }
    };
    
    // 할일을 완료하면 문장 가운데 줄을 긋습니다.
    const toggle = async (index) => {
        const newCompltedTasks = [...tasks];
        newCompltedTasks[index].todo_completed = !newCompltedTasks[index].todo_completed;
        setTasks(newCompltedTasks);
        // 할일 개수 업데이트
        let count = newCompltedTasks.filter((task => !task.todo_completed)).length;
            setTaskCount(count);
        // 업데이트를 하는 코드를 작성하자.
        const data = {
            todo_id : tasks[index].todo_id
        }

        await axios.put(`http://localhost:4000/task/${type}`, data);


    }

    const removeTask = async (index)=>{
        // 변수 선언
        const deleteTasks = [...tasks];
        
        const data = {
            todo_id : deleteTasks[index].todo_id
        }
        
        deleteTasks.splice(index, 1);
        setTasks(deleteTasks);

        let count = deleteTasks.filter((task => !task.todo_completed)).length;
        setTaskCount(count);

        await deleteTask(data);
           

    }


    // 데이터 베이스에서 할일 가져오는 함수
    async function getTask(){
        try{
            const response = await axios.get(`http://localhost:4000/tasks/${type}`);
            const storedtask = response.data || [];
            setTasks(storedtask);
        
            // 할 일 개수 확인  true의 개수 true면 할일 완료
            let count = storedtask.filter((task => !task.todo_completed)).length;
            setTaskCount(count);

        }
        catch(error) {
            console.error(error);
        }
    }
    // 데이터 베이스에 데이터 추가
    async function createTask(datas){
        console.log(datas)
        try{
            await axios.post(`http://localhost:4000/task/${type}`, datas);

        }
        catch(error){
            console.error(error);
        }
    }
    // 데이터 베이스 삭제
    async function deleteTask({todo_id}){
     
        try{
            
            await axios.delete(`http://localhost:4000/task/${type}/${todo_id}`)
    
            
        }
        catch(error){
            console.error(error);
        }
    }
    return(
        <>
        
        <div className="container">
            <h1>{formattedDate}</h1>
            <div className="day">{datofweek}요일</div>
            <div className="task-left">할 일 {taskCount}개 남음</div>
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
                    <input type="checkbox" className = "checkbox" checked={task.todo_completed} onChange={()=>toggle(index)}/>
                    <li key ={index}>
                        
                        <h2 className={`${task.todo_completed ? 'completed' : ''}`}>{task.todo_contents}</h2>
                    </li>
                    <button onClick={()=> removeTask(index)}>삭제</button>
                    </div>
                ))}
            </div>

            
            

        </div>
        </>
    )
}

