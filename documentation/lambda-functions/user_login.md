Description: This is a function used to Authenticate the user

url: /user/login
Filename: login_handler.py
Invoke Function: check_user_exists
Params:
    @email: email id entered by the user
    @password: password entered by the user

Policy: Default
Layers:
1. pymysql
2. 