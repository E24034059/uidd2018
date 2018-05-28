//require modules
var express = require('express');
var app = express();
const port = 10071;
var path =require('path');
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io').listen(http);
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');

//require routers
var test = require('./routes/test.js')(io);

//require db models
var usermodel = require('./models/User.js');

//connect db
require('./config/dbconnect.js');

//set
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(bodyParser.json());
http.listen(port);


global.users = {};//online people
app.use(test);//send a mail to user:"test" and notify



//home page
app.get('/', function (req,res) {
  console.log(req.cookies.user);
  if (req.cookies.user == null) {
      res.redirect('/login');
        } 
  else {
          res.sendFile('demo.html', {root: __dirname+'/public/'});
      }
              });
//login page
app.get('/login',function(req,res){
       res.sendFile('login.html', {root: __dirname+'/public/'});
                                  });
//handle event
//login event
app.post('/login',function(req,res){
      var userdata={};
      username=req.body.user_name;
      userpassword=req.body.user_password;
      usermodel.findOne({name:username,password:userpassword}).exec(function(err,doc){
           userdata=doc; 
           if (Object.keys(userdata).length){
              res.cookie('user',userdata._id,{path:'/',maxAge:600000});
              res.cookie('user_name',userdata.name,{path:'/',maxAge:600000});
              res.redirect('/');
                                            }
           else
           {
             res.send(false);
           }
                                  });});

//io event
io.on('connection',function(socket){
      //login event
      socket.on('login',(data)=>{
            socket.name = data.user;
            if (!users[data.user]) {
                users[data.user] = socket.id;
                usermodel.findOne({name:data.user}).exec(function(err,doc){
                    socket.emit('loginResult',{
                         mail:doc.mails
                                              });
                                                                          });
                                   }
                                      });
      //disconnect event
      socket.once('disconnect',function(){
        console.log('123');
        for(var x in users){
          if( users[x] == socket.id ) {
            delete users[x];
          }
        }
        console.log(users);
                                      });
                                     });

//module.exports = app;

