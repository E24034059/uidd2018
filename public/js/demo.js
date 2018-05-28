const url = 'http://luffy.ee.ncku.edu.tw:10071';
var _user_name;
var _user_password;
var userId;
var socket=io.connect(url);

$(document).ready(function(){
               notifyMe();
               setUser();
                          
         socket.on('loginResult',(data)=>{
              if(!data.code){
                 alert('success login');
                 showmail(data.mail);
                            }
              else alert(data.code);
                                         });
           socket.on('notification', function(msg){
                  notice(msg);
                                                  });
                             });
                          
      
function notice(msg) {
            let _notification = new Notification(`消息通知`,{
                  body:`${msg}`,
                  icon:'./icon/notify.png'
                                      });
                  setTimeout(function(){
                            _notification.close(); 
                                  },5000);
                        
                      }
function setUser(){
    _user_name=$.cookie('user_name');
    if(_user_name){
          socket.emit('login',{
            user:_user_name
          });
                                    }
};

function showmail(mails){
  for(i=0;i<mails.userGet.length;i++){
        if(mails.userGet[i].isread){
             addlist("#readed",mails.userGet[i].mail_id);
                                   } 
        else addlist("#nonreaded",mails.userGet[i].mail_id);
                                     }
                        }  
function addlist(id,text){
  $(id).append("<li id="+text+">"+text+"</li>");
                            }
function notifyMe() {
  // Let's check if the browser supports notifications
  if (!("Notification" in window)) {
    console.log("This browser does not support desktop notification");
  }

  // Let's check whether notification permissions have alredy been granted
  else if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification("Hello!");
  }

  // Otherwise, we need to ask the user for permission
  else if (Notification.permission !== 'denied' || Notification.permission === "default") {
    Notification.requestPermission(function (permission) {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        var notification = new Notification("Thanks for your using!");
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
}
