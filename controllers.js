const cors = require('cors')
const { request } = require('http')
const path = require('path')
const { query } = require('express');
const body = require('body-parser')

var btSerial = new (require("bluetooth-serial-port").BluetoothSerialPort)();

const controller = {}

controller.setRoute=(req,res) => {
    console.log(req.body)
    res.send("ok")

}

module.exports = controller