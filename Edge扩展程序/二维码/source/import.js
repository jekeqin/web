
// 注入网页的js，响应扩展发送过来的事件

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    // 注入到网页的JS，接收到请求之后，执行相应操作
    //console.log(request);
    if( request.event=='url' ){
        callback(location.href);
    }
    else
    {
        callback("This message is from import.js");
    }
});

//console.log("import.js true");