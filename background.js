// Передаем из обработчика background.js данные на страницу popup.html

chrome.extension.onMessage.addListener(function(msg) {
  chrome.tabs.query({
    url: msg.domain // маска доменого имени для выбора вкладки
}, function(result) {
    if(result.length) {
        var tab = result[0]; // первая найденная вкладк
        chrome.tabs.sendMessage(tab.id, msg.text); 
    }
});
});