// Создание функций на странице браузера

function searchUserId() {
  return new Promise ((resolve) => {    
    if (window.location.origin == "https://carrotquest.io") {
      function searchUserIdScript() {
        if ($('[ng-bind^="vm.user.user_id"]').text().length>15 && $(".go_marquiz").length<1) {
          let userId = document.querySelector('[ng-bind^="vm.user.user_id"]').textContent
          let email = document.querySelector(".email");
  
          let button = document.createElement('a');
          button.innerHTML = 'Админка';  
          button.setAttribute("href", "https://panel.marquiz.ru/admin/user/"+userId);
          button.setAttribute("target", "_blank");
          button.setAttribute("class", "go_marquiz");
          button.setAttribute("style", "background: #d34085;color: #fff;border-radius: 4px;padding: 4px 11px;");   
          email.insertAdjacentElement('afterEnd', button);
        }      
      }
      searchUserIdScript();
      $("cq-conversation-list-item").click(function() { 
        setTimeout(searchUserIdScript, 500);
      });
    }     
  })
  // функция добавляет кнопку Админка в кэрроте
}



function searchQuizId () {
  return new Promise ((resolve) => {
   
    let link = document.querySelector('.whitelabel__container a')
    let array, id;
    if (link) {
      const href = link.getAttribute('href')
      array= href.split(/=|&/);
      id = array[array.indexOf('utm_content') + 1]
    } else {
      idElem = document.querySelector("iframe").getAttribute('id');
      array = idElem.split('_');
      id = array[array.length-1 ]
    }
    resolve (id)    
  })
  // функция ищет id квиза и возвращает его если надет

}

async function getHttp(quizId) {
  // Функция делает Get запрос на сервр, чтобы получить данные по квизу 
  const result = await fetch(`https://proxy3-api.marquiz.ru/v1/Quizzes/${quizId}`);
  return result.json() 
  }

function startSearch () {
  // Функция объединяющая все действия с данными
  searchUserId();
  searchQuizId ()
    .then((quizId) => getHttp(quizId))
    .then((data) => { 
      chrome.runtime.sendMessage({
        domain: '*://*',
        data
      });
    }).catch((err) => {
      console.log(err)
      chrome.runtime.sendMessage({
        domain: '*://*',
        data : null
        });
    })
}





