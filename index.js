const cors = require('cors')
const express = require('express')
const body = require('body-parser');
const app = express();
app.use(body.json())
app.use(body.urlencoded({extended:true}))


app.use(express.json())

app.use(cors())



//const routes = require('./routes');
//app.use(routes)
const router = express.Router()
var ruta=[];
var ruti='';
app.use(router);
router.post('/addroute',cors(),body.urlencoded({extended:false}),(req,res) => {
    console.log(req.body.length);
    for( i=1;i<=req.body.length;i++){
      if(req.body[i-1].inicio==0){
      ruti="cero";
      }else{
        if(req.body[i-1].inicio==1){
          ruti="uno";
          }else{
            if(req.body[i-1].inicio==2){
              ruti="dos";
              }else{
                if(req.body[i-1].inicio==3){
                  ruti="tres";
                }
             }
          }
      }
      if(req.body[i-1].final==0){
        ruti=ruti+"cero";
        }else{
          if(req.body[i-1].final==1){
            ruti=ruti+"uno";
            }else{
              if(req.body[i-1].final==2){
                ruti=ruti+"dos";
                }else{
                  if(req.body[i-1].final==3){
                    ruti=ruti+"tres";
                  }
               }
            }
        }
     ruta[i-1]=ruti;
    }
    for( i=1;i<=req.body.length;i++){
      console.log(ruta[i-1]);
    }
    //console.log(req.body[0].inicio)
    res.send("ok")

})
var btSerial = new (require("bluetooth-serial-port").BluetoothSerialPort)();

//Generic Error Handler for the BT Serial Port library as requires error functions
const errFunction = (err) =>{
   if(err){
       console.log('Error', err);
   }
};

//rutas


app.use(express.static(__dirname + '/public/'));

app.listen('3001', function() {

  console.log('Servidor web escuchando en el puerto 3001');

  btSerial.on('found', function(address, name) {
    //conexión
    if(name.includes('CARRITO')){
      console.log('Connecting to: ', name);
      btSerial.findSerialPortChannel(address, function(channel) {
        
        btSerial.connect(address, channel, function() {
          
          btSerial.on('data', function(bufferData) {
            
            console.log(Buffer.from(bufferData).toString());
            for(i=0;i<=ruta.length;i++){

              switch(ruta[i]){
                case "cerouno":
                if(Buffer.from(bufferData).toString()=="1")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="4")
                {
                  final();
                }
                  
                break;
                case "cerodos":
                  if(Buffer.from(bufferData).toString()=="1")
                  {
                    adelante();
                  }
                  if(Buffer.from(bufferData).toString()=="2")
                  {
                    derecha();
                  } 
                  if(Buffer.from(bufferData).toString()=="3")
                {
                  final();
                }
                break;
                case "cerotres":
                if(Buffer.from(bufferData).toString()=="1")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  derecha();
                }  
                if(Buffer.from(bufferData).toString()=="4")
                {
                  final();
                }
                break;
                case "unocero":
                if(Buffer.from(bufferData).toString()=="1")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  derecha();
                }  
                if(Buffer.from(bufferData).toString()=="4")
                {
                  final();
                }
                break;
                case "unodos":
                if(Buffer.from(bufferData).toString()=="1")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="4")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="5")
                {
                  final();
                }
               
                break;
                case "unotres":["D","D","A","D","I"];
                if(Buffer.from(bufferData).toString()=="1")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  adelante();
                }
                if(Buffer.from(bufferData).toString()=="4")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="5")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="6")
                {
                  final();
                }
                break;
                case "doscero":
                if(Buffer.from(bufferData).toString()=="1")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  adelante();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  final();
                }
                break;
                case "dosuno":
                if(Buffer.from(bufferData).toString()=="1")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="4")
                {
                  izquierda();
                }  
                if(Buffer.from(bufferData).toString()=="5")
                {
                  final();
                }
                break;
                case "dostres":
                if(Buffer.from(bufferData).toString()=="1")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="4")
                {
                  izquierda();
                } 
                if(Buffer.from(bufferData).toString()=="5")
                {
                  final();
                }
                break;
                case "trescero":["I","D","I"];
                if(Buffer.from(bufferData).toString()=="1")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="4")
                {
                  final();
                }
                
                break;
                case "tresuno":
                if(Buffer.from(bufferData).toString()=="1")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  adelante();
                }
                if(Buffer.from(bufferData).toString()=="4")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="5")
                {
                  izquierda();
                }  
                if(Buffer.from(bufferData).toString()=="6")
                {
                  final();
                }
                break;
                case "tresdos":
                if(Buffer.from(bufferData).toString()=="1")
                {
                  izquierda();
                }
                if(Buffer.from(bufferData).toString()=="2")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="3")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="4")
                {
                  derecha();
                }
                if(Buffer.from(bufferData).toString()=="5")
                {
                  final();
                }
               
                break;
               
              }
              /*
var cerouno= ["I","D","D"];
var cerodos= ["A","D"];
var cerotres=["D","I","D"];

var unocero= ["I","I","D"];

var unodos=  ["D","D","D","I"];

var unotres= ["D","D","A","D","I"];
var doscero= ["I","A"];
var dosuno=  ["D","I","I","I"];
var dostres= ["D","D","D","I"];
var trescero=["I","D","I"];
var tresuno= ["D","I","A","I","I"];
var tresdos= ["I","D","D","D"];
*/
            }

            function derecha(){
              btSerial.write(Buffer.from('D\n'), errFunction);
            }
            function izquierda(){
              btSerial.write(Buffer.from('I\n'), errFunction);
            }
            function adelante(){
              btSerial.write(Buffer.from('A\n'), errFunction);
            }

            function final(){
              btSerial.write(Buffer.from('F\n'), errFunction);
            }
           
            
          });
        }, errFunction);
      },errFunction);
    }
});


btSerial.inquire();

});