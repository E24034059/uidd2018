const express = require('express');
const app=express();
const port=10071;
member_data_path='./json/id_name.json';
var fs=require('fs');
member=JSON.parse(fs.readFileSync(member_data_path));
var bodyParser=require('body-parser');
//var multer=require('multer');
var unlencodedParser=bodyParser.urlencoded({extend:false})
app.listen(port);
app.use(express.static(__dirname+'/public'));
app.use(unlencodedParser);
app.post('/post_id',function(req,res){
     var id=req.body.student_id;
     if(member[id]!=undefined)
     {
       res.send("<h1>hello,"+member[id].name+"</h1>");
     }
     else
     {
       res.send("<h1>your are not in our team</h1>");
     }
                                     })
app.post('/ajax_post_id',function(req,res){   
     var id=req.body.ajax_post_id;
     if(member[id]!=undefined)
     {
       res.send("hello,"+member[id].name);
     }
     else
     {
       res.send("your are not in our team");
     }
      })
