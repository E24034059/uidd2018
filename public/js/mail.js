
$(document).ready(function(){
         $('#createmail_submit').click(function(e){
               e.preventDefault();
               $.ajax({
                   method:"post",
                   url:'./createAmail',
                   data:{
                        },
                   success:function(data){$('#returndata').text(data);}
                        
                      })
                                                });
                            });
