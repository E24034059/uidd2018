
$(document).ready(function(){
         $('#sendmail_submit').click(function(e){
               e.preventDefault();
               $.ajax({
                   method:"post",
                   url:'./sendAmail',
                   data:{
                        },
                        
                      })
                                                });
                            });
