
// 注入网页的js，响应扩展发送过来的事件


function _lamp(tabId){
    var lampId = "import.lamp";
    var css = chrome.extension.getURL("/source/css/lamp.css");
    //console.log(css);

    chrome.storage.sync.get({closeLamp:false}, function(obj){
        if( obj.closeLamp && !document.getElementById(lampId) ){
            // try{
            //     chrome.tabs.removeCSS(null, {file:"source/lamp.css"});
            // }catch(e){
            //     console.error(e);
            // }
            var node = document.createElement("link");
            node.setAttribute("type", "text/css");
            node.setAttribute("rel", "stylesheet");
            node.setAttribute("href", css);
            node.setAttribute("id", lampId);
            document.getElementsByTagName("head")[0].appendChild(node);
        }else{
            // try{
            //     chrome.tabs.insertCSS(null, {file:"source/lamp.css"});
            // }catch(e){
            //     console.error(e);
            // }
            if(document.getElementById(lampId))
                document.head.removeChild(document.getElementById(lampId));
        }
    });
}
_lamp();

try{
    chrome.tabs.onActivated?.addListener(function(obj){
        _lamp(obj.tabId);
    });
} catch {
    document.addEventListener('visibilitychange', function(){
        //console.log(document.visibilityState);
        //_lamp(null);
    });
}
try{
    chrome.tabs.onActiveChanged?.addListener(function(tabId, obj){
        //console.log("onActiveChanged", tabId);
        _lamp(tabId);
    });
}catch{

}


chrome.runtime.onMessage.addListener(function(request, sender, callback) {
    // 注入到网页的JS，接收到请求之后，执行相应操作
    //console.log(request);
    if(request.event=='lamp'){
        _lamp(request.tabId);
    }
});

//console.log("lamp.js run");