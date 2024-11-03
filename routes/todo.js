const express = require('express')
const router = express.Router();
const {addTodo, getTodo, deleteTodo, updateStatus} = require('../controllers/todoController')
const check = require('../middlewares/check')

router.post('/addTodo', check, addTodo)
router.get('/getTodos', check, getTodo)
router.delete('/deleteTodo/:id', check, deleteTodo)
router.put('/updateStatus/:id', check, updateStatus)
module.exports = router