// Создание функций на странице браузера

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





