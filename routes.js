const controller = require('./controllers')
const express = require('express')
const body = require('body-parser');
const router = express.Router()
const cors = require('cors')

router.post('/addroute',cors(),body.urlencoded({extended:false}),(req,res) => {
    console.log(req.body)
    res.send("ok")

})

module.exports = router