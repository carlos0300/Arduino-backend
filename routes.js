const controller = require('./controllers')
const express = require('express')
const body = require('body-parser');
const router = express.Router()
const cors = require('cors')

router.post('/addroute',cors(),body.urlencoded({extended:false}),controller.setRoute)

module.exports = router