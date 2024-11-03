const express = require('express')
const router = express.Router();
const check = require('../middlewares/check')

router.get('/user/login',check, (req, res) => {
    res.send({data: "your got the access for private route"})
})

module.exports = router;