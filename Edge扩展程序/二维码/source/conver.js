function _importCss(css, id){
    var node = document.createElement("link");
    node.setAttribute("type", "text/css");
    node.setAttribute("rel", "stylesheet");
    node.setAttribute("href", chrome.extension.getURL(css));
    node.setAttribute("id", id);
    document.getElementsByTagName("head")[0].appendChild(node);
}

_importCss('/source/css/cover.css', 'import.conver');