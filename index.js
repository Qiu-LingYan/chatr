var net=require("net");
var config=require("./config");
var Client=net.createConnection({
    port:config.port,
    host:config.host
});
var username;
Client.on("connect",function () {
    console.log("请输入用户名：");
    process.stdin.on("data",function (data){
        data=data.toString().trim();
        //判断用户是否已经存在
        if(! username){
            var send={
                mstype:"signup",
                username:data
            };
            Client.write(JSON.stringify(send));
            return;
        }
        var regex=/(.{1,18}):(.+)/;
        var matches=regex=regex.exec(data);
        if(matches){
            //能匹配则是p2p
            var from=username;//发送方是自己
            var to=matches[1];//发给谁
            var message=matches[2];
            //构造JSON形式信息
            var send={
                mstype: "p2p",
                from:username,
                to:to,
                message:message
            };
            Client.write(JSON.stringify(send));
        }else{
            //广播
            var send={
                mstype:"broadcast",
                from:username,
                message:data
            };
            Client.write(JSON.stringify(send));
        }
    });
});
Client.on("data",function (data) {
    data=JSON.parse(data);
    switch (data.mstype) {
        case "signup":
            var code=data.code;
            switch (code) {
                case 1000:
                    username=data.username;
                    console.log(data.message);
                    break;
                case 1001:
                    console.log(data.message);
                    break;
                default:
                    break;
            }
            break;
        case "broadcast":
            console.log(data.message);
            break;
        case "p2p":
            var code=data.code;
            switch (code) {
                case 2000:
                    console.log(data.message);
                    break;
                case 2001:
                    console.log(data.message);
                    break;
                default:
                    break;
            }
            break;
        default:
            break;
    }
});
Client.on("error",function () {
    console.log("聊天室已关闭！！");
})
