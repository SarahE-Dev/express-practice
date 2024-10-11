import express from 'express'
const router = express.Router() 

let todos = [
    { id: 1, task: 'Buy groceries', completed: false },
    { id: 2, task: 'Clean the house', completed: true },
    { id: 3, task: 'Walk the dog', completed: false }
]

let id = todos.length;

router.get('/', (req, res) => {
    res.json(todos)
})

router.post('/new', (req, res) => {
    try {
        const newTodo = req.body
        let foundTodo = todos.find((todo) => todo.task.toLowerCase() === newTodo.task.toLowerCase());
        if (foundTodo) {
            throw new Error('Task already exists')
            return;
        }
        console.log(newTodo)
        id++
        let todo = {id, ...newTodo}
        res.status(201).json(todo)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    
})

router.put('/:id', (req, res) => {
    const id = req.params.id
    const updatedTodo = req.body
    todos = todos.map((todo) => {
        if (todo.id === Number(id)) {
            return {...todo, ...updatedTodo}
        }
        return todo
    })
    res.json(todos)
})



export default router