import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks"
import { AddTask } from "./components/AddTask"
import { TaskDetails } from "./components/TaskDetails"
import { Footer } from "./components/Footer"
import { About } from "./components/About"
import {useState, useEffect} from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])

  //Se ejecuta al inicio
  useEffect(()=>{
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }

    getTasks()

  }, [])

  // Fetch data from server
  const fetchTasks = async () => {
    const res = await fetch("http://localhost:5000/task")
    const data = await res.json()

    return data
  }

  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/task/${id}`)
    const data = await res.json()

    return data
  }

  // Add Task
  const addTask = async (task) =>{
    const res = await fetch('http://localhost:5000/task', {
      method:'POST',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(task)
    })
    
    console.log(res)

    const data = await res.json()

    setTasks([...tasks, data])
  }

  //Delete Task
  const deleteTask = async (id) =>{
    await fetch(`http://localhost:5000/task/${id}`, {method:"DELETE"})

    setTasks(tasks.filter((task) => task.id !== id ))
  }

  //Toggle Reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id)
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder}

    const res = await fetch(`http://localhost:5000/task/${id}`, {
      method:'PUT',
      headers:{
        'Content-type':'application/json'
      },
      body: JSON.stringify(updTask)
    })

    setTasks(tasks.map((task)=> task.id === id ? { ...task, reminder: !task.reminder } : task))
  }

  return (
    <Router>
      <div className="App container">
        <Header title="Task Tracker" onAdd={()=>setShowAddTask(!showAddTask)} showAdd={!showAddTask} ></Header>
        <Routes>
          
          <Route path="/" element={
            <>
            {showAddTask && <AddTask onAdd={addTask} ></AddTask>}
  
            {tasks.length > 0 ? (
              <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}></Tasks>
            ) : (
              <h3> No task </h3>
            )}
            </>
          }/>

          <Route path="/about" element={<About/>} />
          <Route path="/task/:id" element={<TaskDetails/>} />

        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
