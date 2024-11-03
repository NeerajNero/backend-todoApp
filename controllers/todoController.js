const Todo = require('../todo.model/todo.model')
const addTodo = async(req,res) => {
    try{
        const {todoSubject, todoDescription} = req.body
        const todo = new Todo({
            todoSubject: todoSubject,
            todoDescription: todoDescription,
            userId: req.user.id
        })

        await todo.save();
        res.status(201).json(todo)
    }catch(error){
        res.status(500).json({message: "unable to add todo"})
    }
}

const getTodo = async(req,res) => {
    try{
        const {id} = req.user
        const allTodos = await Todo.find({userId: id});
        res.status(200).json(allTodos)
    }catch(error){
        res.status(500).json({message: "error occured while fetching the data"})
    }
}
const deleteTodo = async(req,res) => {
    try{
        const response = await Todo.findByIdAndDelete(req.params.id)
        res.status(200).json({message: "todo deleted successfully"})
    }catch(error){
        res.status(500).json({message: "error occured while deleting todo"})
    }
}
const updateStatus = async(req,res) => {
    try{
        const {id} = req.params;
        const {completed} = req.body;
        const updateStatus = await Todo.findByIdAndUpdate(id,{completed}, {new:true})
        if(updateStatus){
            res.status(200).json(updateStatus)
        }else{
            res.status(404).json({message: "todo not found"})
        }
    }catch(eror)
    {
        res.status(500).json({message: "unable to update status"})
    }
        
}

module.exports = {addTodo, getTodo, deleteTodo, updateStatus}