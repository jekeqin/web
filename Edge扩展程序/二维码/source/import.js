
// 注入网页的js，响应扩展发送过来的事件

chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    console.log(request);
    if( request.event=='url' ){
        callback(location.href);
    }else{
        callback("This message is from content.js");
    }
});

console.log("import true");