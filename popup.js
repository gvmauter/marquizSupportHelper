// 1. Принимаем сообщение каждую секунду
// 2. Если есть параметр, то создаем кнопки и добавляем в меню
// 3. Если нет, то пишем "Квиз не найден"



chrome.runtime.onMessage.addListener(function GetMessage (message) {
  document.querySelector('.info').textContent = "";

  document.querySelector('.menu').classList.add('active');
  document.querySelector('#inputQuizId').value = message.data.id; 
  document.querySelector('#inputUserId').value = message.data.userId;
  document.querySelector('.editor').href = `https://panel.marquiz.ru/quizzes/${message.data.id}/edit#start_page`;
  document.querySelector('.admin').href = `https://panel.marquiz.ru/admin/user/${message.data.userId}`;
});


function copy(id) {
  var copyText = document.querySelector(`#${id}`);
  window.navigator.clipboard.writeText(copyText.value)
  document.querySelector('.info').textContent = "Скопированно";
}

document.querySelector("#copyQuizId").addEventListener("click", () => {
  copy('inputQuizId')
});
document.querySelector("#copyUserId").addEventListener("click", ()=> {
  copy('inputUserId')
});
