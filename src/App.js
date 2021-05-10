import { useState,useEffect } from 'react'
import Header from './componets/Header'
import Tasks from './componets/Tasks'
import AddTask from './componets/AddTask'

const App=()=>{
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks ,setTasks]= useState([])

  useEffect(()=>{
    const getTasks=async()=>{
        const tasksFromServer = await fetchTasks()
        setTasks(tasksFromServer)
    } 
    getTasks()
  },[])
  
  //fetching task
  const fetchTasks=async()=>{
    const res=await fetch('http://localhost:5000/tasks')
    const data=await res.json()
    return data
  }

  

    //add task
    const addTask= async (task)=>{
      console.log(task);
      const res= await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
          'Content-type':'application/json',
        },
        body: JSON.stringify(task),
      })

      const data = await res.json()

      setTasks([...tasks,data])
      // const id=Math.floor(Math.random()*1000)+1
      // const newTask={id,...task }
      // setTasks([...tasks,newTask])
    }


  //delete task
  const deleteTasks= async (id)=>{
   await fetch(`http://localhost:5000/tasks/${id}`,{
     method: 'DELETE',
   })
    setTasks(tasks.filter((task)=>task.id!==id))
  }

   // toggle reminder
   const toggleReminder=(id)=>{
    setTasks(tasks.map((task)=>task.id===id ? {...task,reminder: !task.reminder}:task))
   }

  return (
    <div className="container">
      <Header onAdd={()=>setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
      {showAddTask && <AddTask onAdd={addTask}/>}
      {tasks.length > 0 ? <Tasks tasks={tasks} onDelete={deleteTasks} onToggle={toggleReminder}/> : ('No Tasks to Show')}
    </div>
  );  
}
export default App;