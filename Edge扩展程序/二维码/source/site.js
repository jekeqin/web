

// 关闭扩展
// window.close();

// qrcode.clear(); // 清除代码
// qrcode.makeCode("http://www.w3cschool.cc"); // 生成另外一个二维码

var coder = new QRCode("code", { width: 180, height: 180, correctLevel : QRCode.CorrectLevel.L });
var textarea = document.getElementById("url");

function createCode(text){
    try{
        coder.clear();
        coder.makeCode(text);
    }catch(e){

    }
}



if(textarea){
    textarea.onblur = function(){
        createCode( textarea.value );
    }
}

chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {event:'url'}, function(url){
        createCode(url);
        textarea.value = url;
    });
});

