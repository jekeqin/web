
// https://www.cnblogs.com/liuxianan/p/chrome-plugin-develop.html
// https://developer.mozilla.org/zh-CN/docs/Mozilla/Add-ons/WebExtensions/API

// 关闭扩展
// window.close();

// qrcode.clear(); // 清除代码
// qrcode.makeCode("http://www.w3cschool.cc"); // 生成另外一个二维码

var coder = new QRCode("code", { width: 180, height: 180, correctLevel : QRCode.CorrectLevel.L });


function createCode(text){
    try{
        coder.clear();
        if( (text && text.length>0) || text===0  )
            coder.makeCode(text);
    }catch(e){

    }
}

var textarea = document.getElementById("url");
if(textarea){
    textarea.onblur = function(){
        createCode( textarea.value );
    }
    textarea.onkeydown = function(e){
        if(e && e.keyCode==13){
            createCode( textarea.value );
        }
    }
}


chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    // 扩展加载完成后，向网页发送请求
    chrome.tabs.sendMessage(tabs[0].id, {event:'url'}, function(url){
        if( url==undefined ){
            url = '';
        }
        createCode(url);
        textarea.value = url;
    });
});

var lamp = document.getElementById("lamp");
if( lamp ){
    console.log("qrcode.import.js",chrome.i18n.getMessage("button"));

    chrome.storage.sync.get({closeLamp:false}, function(obj){
        console.log(obj);
        lamp.checked = obj.closeLamp;
    });
    lamp.addEventListener('change', function(){
        chrome.storage.sync.set({closeLamp:lamp.checked});
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {event:'lamp', tabId:tabs[0].id});
        });
    });
}