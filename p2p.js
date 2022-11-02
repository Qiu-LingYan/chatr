exports.p2p=function (socket,data,users) {
    var from=data.from;
    var to=data.to;
    var message=data.message;
    var receiver=users[to];
    if(!receiver){//接收方不存在
      var send={
          mstype:"p2p",
          code:2001,
          message:"用户"+to+"不存在"
      }
      socket.write(JSON.stringify(send));
    }else{
        //存在则向接收方发送信息
        var send={
            mstype:"p2p",
            code:2000,
            from:from,
            message:from+"对你说"+message
        }
        receiver.write(JSON.stringify(send));
    }
};
