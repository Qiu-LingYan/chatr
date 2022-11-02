exports.broadcast=function (data,users) {
    var from=data.from;
    var message=data.message;
    message = from+"说: "+message;
    //构建消息
    var send={
        mstype:"broadcast",
        message:message
    };
    send =new Buffer(JSON.stringify(send));
    //遍历用户组所有用户，出发送方的所有用户
    for(var username in users){
        if(username!=from){
            users[username].write(send);
        }
    }
};
