const jwt = require('jsonwebtoken')
const JWT_SECRET = "batman"
const check = async(req,res,next) => {
    const token = req.cookies.access_token;
    if(!token){
      return  res.status(401).json("no token found")
    }
    jwt.verify(token, JWT_SECRET, (err,user) => {
        if(err){
            return res.status(403).json("invalid token")
        }
        req.user = {
            id: user.id
        }
        next();
    })

}
module.exports = check;