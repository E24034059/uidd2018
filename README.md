/public   放html,js
          demo.html是主頁面
          login.html是登入頁面
          sendmail.html是用來測試寄一封信給test的時候會不會跳通知

/routes   暫時沒用,因為好像說不要切開,只有測試時用test.js

/config   用來放一些設定的,目前只有連db的設定

/models   放mongoose的model

demosever.js sever運行

使用時網址是: luffy.ee.ncku.edu.tw:10071
使用流程    : 檢測cookie的"user"欄位, 若為空=> login頁面   =>登入=>存cookie
                                      不為空=> demo頁面
              連到demo頁面時會,前端會取cookie的"user_name"欄位,
              然後傳socket.io的"login"事件,監聽"loginResult"事件取得user資料
