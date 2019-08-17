export default function getData() {

  const goodsWrapper = document.querySelector('.goods');
  
  // встроенная в браузер API, работает асинхронно, возвращает promise, 
  // много настроек, по умолчанию работает как GET запрос
  return fetch('../db/db.json')

  // получаем данные
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error ('Данные не были получены, ошибка: ' + response.status);
      }
    })

    // возвращаем данные из функции
    .then((data) => {
      return data;
    })

    // если данные не получены
    .catch((err) => {
      console.warn(err);
      goodsWrapper.innerHTML = '<div style="color:red; font-size:30px">Упс! Что-то пошло не так...</div>';
    });
}