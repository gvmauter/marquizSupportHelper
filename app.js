// Создание функций на странице браузера

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

function startSearch () {
  // Функция объединяющая все действия с данными
  searchQuizId ()
    .then((quizId) => getHttp(quizId))
    .then((data) => { 
      chrome.runtime.sendMessage({
        domain: 'chrome-extension://*',
        data
      });
    }).catch((err) => {
      console.log(err)
      chrome.runtime.sendMessage({
        domain: 'chrome-extension://*',
        data : null
        });
    })
}




// Старый способ реализации
// const search = setInterval(() => {

//   searchQuizId ()
//   .then((quizId) => getHttp(quizId))
//   .then((data) => { 
//     chrome.runtime.sendMessage({
//       domain: 'chrome-extension://*',
//       data
//     });
//   }).catch((err) => {
//     console.log(err)
//     clearInterval(search);
//   })
// }, 1000);


