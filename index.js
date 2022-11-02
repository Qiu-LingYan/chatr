exports.signup = function (socket,data,users) {
//获取注册用户的用户名
    var username=data.username;
    if(!users[username]){  //不存在，则保存用户名和socket
        users[username]=socket;
        var send={
            mstype:"signup",
            code:1000,
            username:username,
            message:"注册成功"
        };
        socket.write(JSON.stringify (send));
    }else{//cunzai
        var send={
            mstype:"signup",
            code:1001,
            message: "用户名已被占，请重新输入用户名"
        }
        socket.write(JSON.stringify(send));
    }
};
