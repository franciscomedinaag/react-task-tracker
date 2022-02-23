import { useEffect, useState } from "react"
import { useParams, Navigate, useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"

export const TaskDetails = () => {
  const[loading, setLoading] = useState(true)
  const[task, setTask] = useState({})
  const[error, setError] = useState(null)

  const params = useParams()
  const navigate = useNavigate()

  useEffect(()=>{
    const fetchTask = async () => {
        const res = await fetch(`http://localhost:5000/task/${params.id}`)
        const data = await res.json()

        if(res.status === 404){
            navigate("/")
        }

        setTask(data)
        setLoading(false) 
    }

    fetchTask()
  })

  return loading ? 
    (  <div> <h3>Loading...</h3>  <Link to="/">Go back</Link> </div>) : 
    (
        <div>
            <p>{task.text}</p>
            <p>{task.day}</p>
            <p>{task.reminder}</p>
            <Link to="/">Go back</Link>
        </div>
    )
}
