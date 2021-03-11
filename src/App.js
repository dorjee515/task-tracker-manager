import { useState } from 'react'
import Header from './componets/Header'
import Tasks from './componets/Tasks'


const App=()=>{
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

  //delete task
  const deleteTasks=(id)=>{
    setTasks(tasks.filter((task)=>task.id!==id))
  }

  return (
    <div className="container">
      <Header/>
      <Tasks tasks={tasks} onDelete={deleteTasks}/>
    </div>
  );  
}
export default App;
