import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3000/todos')
    .then((res) =>{
      console.log(res);
      setTodos(res.data)
    })
    .catch((err) =>{
      console.log(err)
      
    })
    .finally(() => {
      setLoading(false)
    })
  }, [])

  const completeTask = (id) => {
   
    axios.put(`http://localhost:3000/todos/${id}`)
    .then((res) => {
      console.log(res.data);
      const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
          return {...todo, completed: !todo.completed}
        }
        return todo
      })
      setTodos(updatedTodos)
      setError('')
    })
    .catch((err) =>{
      console.log(err)
    })
    .finally(() => {
      setLoading(false)
    })
  }
  
  const submitTodo = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:3000/todos/new', {task: newTodo})
      setTodos([...todos, res.data])
      setError('')
      setNewTodo('')
      setLoading(false)
      
    } catch (error) {
      console.log(error.response.data.message)
      setError(error.response.data.message)
      setLoading(false)
    }
  }

  return (
    <>

      {error && <h4 style={{color: 'red'}}>{error}</h4>}
      <form style={{marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onSubmit={submitTodo}>
        <input style={{marginRight: '10px', height: 30, borderRadius: 15}} value={newTodo} onChange={(e) => setNewTodo(e.target.value)} type="text" placeholder='Enter a task' />
        <button>Submit</button>
      </form>
    
      <h1 style={{textDecoration: 'underline'}}>Todo List</h1>
      {loading && <h2 style={{color: 'blue'}}>Loading...</h2>}
      {todos.map((todo) => {
        return <div key={todo.id}>
          <h1 onClick={() => completeTask(todo.id)} style={{color: 'blueviolet', textDecoration: todo.completed ? 'line-through' : ''}}>{todo.task}</h1>
          
        </div>
      })}
    </>
  )
}

export default App
