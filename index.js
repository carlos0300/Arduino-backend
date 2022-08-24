const cors = require('cors')
const express = require('express')
const body = require('body-parser');
const app = express();
app.use(body.json())
app.use(body.urlencoded({extended:true}))


app.use(express.json())

app.use(cors())

const routes = require('./routes');
app.use(routes)

var btSerial = new (require("bluetooth-serial-port").BluetoothSerialPort)();

//Generic Error Handler for the BT Serial Port library as requires error functions
const errFunction = (err) =>{
   if(err){
       console.log('Error', err);
   }
};

// Connecting to BT device can take a few seconds so a little console.log to keep you entertained.
// Are you not entertained?

/*
  For this to work you will have to connect to the Bluetooth device on your computer in the normal way
  I.e via Bluetooth settings: Default password is usually 0000 or 1234
*/

// Once BtSerial.inquire finds a device it will call this code
// BtSerial.inquire will find all devices currently connected with your computer

app.use(express.static(__dirname + '/public/'));

app.listen('3001', function() {
  console.log('Servidor web escuchando en el puerto 3001');

  btSerial.on('found', function(address, name) {
    // If a device is found and the name contains 'HC' we will continue
    // This is so that it doesn't try to send data to all your other connected BT devices
    if(name.includes('CARRITO')){

      console.log('Connecting to: ', name);
      btSerial.findSerialPortChannel(address, function(channel) {
        // Finds then serial port channel and then connects to it
        btSerial.connect(address, channel, function() {
          // Now the magic begins, bTSerial.on('data', callbackFunc) listens to the bluetooth device.
          // If any data is received from it the call back function is used
          btSerial.on('data', function(bufferData) {
            // The data is encoded so we convert it to a string using Nodes Buffer.from func
            console.log(Buffer.from(bufferData).toString());
            //Primero, hacemos que gire a la izquierda
            if(Buffer.from(bufferData).toString()=="1")
            {
              btSerial.write(Buffer.from('I\n'), errFunction);
            }
            //Luego hacemos que gire a la derecha
            if(Buffer.from(bufferData).toString()=="2")
            {
              btSerial.write(Buffer.from('D\n'), errFunction);
            }

            // Now we have received some data from the Arduino we talk to it.
            // We Create a Buffered string using Nodes Buffer.from function
            // It needs to be buffered so the entire string is sent together
            // We also add an escape character '\n' to the end of the string
            // This is so Arduino knows that we've sent everything we want
            //btSerial.write(Buffer.from('siuuuu x2\n'), errFunction);
          });
        }, errFunction);
      },errFunction);
    }/*else{
      console.log('Not connecting to: ', name);
    }*/
});

// Starts looking for Bluetooth devices and calls the function btSerial.on('found'
btSerial.inquire();

});