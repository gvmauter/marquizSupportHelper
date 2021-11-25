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

// Добавление пункта контекстного меню, для поиска клиента по ID
chrome.contextMenus.create({
  'title' : 'Найти пользователя Marquiz',
  'contexts' : ["selection"]
  }
)

// Добавляем обработчик на нажатие контекстного меню
chrome.contextMenus.onClicked.addListener(
  (res) => {
    let email
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    email = res.selectionText
    if(reg.test(email) == false) {
      console.log('Некорректный email"');
      return false;
    }


    chrome.tabs.create({
      // cjplt
      url : 'https://panel.marquiz.ru/admin/user/',
    },(tab) => {
      chrome.tabs.executeScript(tab.id, 
        {code: 
          `fetch('https://api.marquiz.ru/v1/users/findOne?filter={"where":{"email":"${email}"}}', {
            headers: {
              Authorization: localStorage.getItem('accessToken')
            }
            })
            .then(res => res.json())
            .then(json => {
              let url = 'https://panel.marquiz.ru/admin/user/' + json.id;
              window.location.replace(url);
            })`
        }
      )
    })
  })

