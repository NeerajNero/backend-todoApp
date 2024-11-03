const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const initializeDatabase = require('./db.connect.js/db.connect');
const privateRoutes = require('./routes/private')
const authRoutes = require('./routes/auth')
const todoRoutes = require('./routes/todo')


initializeDatabase();
const app = express();
app.use(cookieParser())
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true 
}))

app.use('/auth', authRoutes)
app.use('/private', privateRoutes)
app.use('/todos', todoRoutes)

app.listen(3000, () => {
    console.log("server is running on port 3000")
})