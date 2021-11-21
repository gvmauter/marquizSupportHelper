// 1. Найти ID квиза на старнице
// 2. Отправить http запрос с помощью этого ID(промис)
// 3. Обработать данные 
// 4. Отрисовать кнопку приложения
// 5. Повешать событие на кнопку для  открытия блока с функциями 

function searchQuizId () {
  // функция ищет id квиза и возвращает его если надет 
  const href = document.querySelector('.whitelabel__container a').getAttribute('href')
  let array = href.split('=');
  
  return array[array.length-1]
}

async function getHttp(quizId) {
  // Функция делает Get запрос на сервр, чтобы получить данные по квизу 
  const result = await fetch(`https://proxy3-api.marquiz.ru/v1/Quizzes/${quizId}`);
  return result.json() 
  }


(() => new Promise ((resolve, reject) => {
  setTimeout(()=> {
    resolve(searchQuizId ())
  }, 3000)
}))()
  .then((quizId) => getHttp(quizId))
  .then((data) => {
    let button = document.createElement('a');
    button.setAttribute('style', 'position: fixed ;width: 20px;height: 20px;background-color: pink;top: 10px;right: 10px;z-index: 1;opacity: .4;     display: block;');
    button.href = `https://panel.marquiz.ru/quizzes/${data.id}/edit#start_page`;
    document.body.appendChild(button)
    console.log(data)
    return data
  })