// 1. Найти ID квиза на старнице
// 2. Отправить http запрос с помощью этого ID(промис)
// 3. Обработать данные 
// 4. Передаем с помощью сообщения в обработчик background.js

function searchQuizId () {
  return new Promise ((resolve) => {
    const href = document.querySelector('.whitelabel__container a').getAttribute('href')
    let array = href.split('=');
    resolve (array[array.length-1])
  })
  // функция ищет id квиза и возвращает его если надет

}

async function getHttp(quizId) {
  // Функция делает Get запрос на сервр, чтобы получить данные по квизу 
  const result = await fetch(`https://proxy3-api.marquiz.ru/v1/Quizzes/${quizId}`);
  return result.json() 
  }





const search = setInterval(() => {

  searchQuizId ()
  .then((quizId) => getHttp(quizId))
  .then((data) => { 
    chrome.runtime.sendMessage({
      domain: 'chrome-extension://*',
      data
    });
  }).catch((err) => {
    console.log(err)
    clearInterval(search);
  })
}, 1000);


