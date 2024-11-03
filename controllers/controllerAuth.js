const bcrypt = require('bcryptjs')
const User = require('../user.model/user.model')
const jwt = require('jsonwebtoken')

const JWT_SECRET = "batman"
const register = async(req,res) => {
    try{
        const findUser = await User.findOne({username: req.body.username})
        if(findUser){
            return res.status(400).json({message: "username not available please select a different username"})
        }
        if(req.body.password){
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password, salt)

            const newUser = new User({
                username: req.body.username,
                password: hashedPassword 
            })
            await newUser.save();
            res.status(201).json("new user created")
        }else{
            res.status(400).json("please enter a valid password")
        }
    }catch(error){
        res.status(500).json("unable to create user")
    }
}

const login = async(req,res) => {
    try{
        const findUser = await User.findOne({username: req.body.username})
        if(!findUser){
           return res.status(404).json("no user found")
        }
        const isPasswordCorrect = await bcrypt.compare(req.body.password, findUser.password);
        if(!isPasswordCorrect){
           return res.status(500).json("wrong password")
        }
        const payload = {
            id: findUser._id
        }
        const token = jwt.sign(payload, JWT_SECRET, {expiresIn: "1d"})
        res.cookie('access_token', token, {httpOnly: true, sameSite: 'none', secure: true,}).status(200).json({user: findUser.username})
    }catch(error){
        res.status(500).json(err.message)
    }
}

const logout = (req,res) => {
    res.clearCookie('access_token')
    res.status(200).json("logout successfull")
}
module.exports = {register,login,logout}