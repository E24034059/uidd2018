$(document).ready(function(){
         $('#register_submit').click(function(e){
               e.preventDefault();
               $.ajax({
                   method:"post",
                   url:'./register',
                   data:{
                      user_name:$("input[name=user_name]").val(),
                      user_password:$("input[name=user_password]").val(),
                        },
                   success:function(data){$('#returndata').text(data);}
                        
                      })
                                                });
                            });
