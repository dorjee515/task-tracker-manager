import { useState } from 'react'
import Header from './componets/Header'
import Tasks from './componets/Tasks'
import AddTask from './componets/AddTask'

const App=()=>{
  const [showAddTask,setShowAddTask]=useState(false)
  const [tasks ,setTasks]= useState([
    {
    id: 1,
    text: 'Work in react',
    day: 'feb 4',
    reminder: true,
},{
    id: 2,
    text: 'Implementation of react ',
    day: 'march 3',
    reminder: true,
}])
  
    //add task
    const addTask=(task)=>{
      const id=Math.floor(Math.random()*1000)+1
      const newTask={id,...task }
      setTasks([...tasks,newTask])
    }


  //delete task
  const deleteTasks=(id)=>{
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
