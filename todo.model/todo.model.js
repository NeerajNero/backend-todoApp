const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    todoSubject: {
        type: String,
        required: true
    },
    todoDescription: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    completed: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

const Todo = new mongoose.model('Todo', todoSchema)
module.exports = Todo