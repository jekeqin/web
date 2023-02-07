
// 注入网页的js，响应扩展发送过来的事件

// 在此处理被注入网站的逻辑

// 接收扩展发来的消息，处理后callback
chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    // 注入到网页的JS，接收到请求之后，执行相应操作
    console.debug(request);
    if( request.event=='url' ){
        callback(location.href);
    }
    else
    {
        callback("This message is from import.js");
    }
});

//console.log("import.js true");
