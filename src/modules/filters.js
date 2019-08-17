export default function filters() {

  const cards = document.querySelectorAll('.goods .card'),
  discountCheckbox = document.getElementById('discount-checkbox'),
  min = document.getElementById('min'),
  max = document.getElementById('max'),
  search = document.querySelector('.search-wrapper_input'),
  searchBtn = document.querySelector('.search-btn');

  // при клике или изменениях вызываем функцию filter()
  discountCheckbox.addEventListener('click', filter); // акции
  min.addEventListener('change', filter); // цены
  max.addEventListener('change', filter); // цены
  
  // фильтр по ценам и акциям
  function filter() {

    cards.forEach((elem) => {
      const cardPrice = elem.querySelector('.card-price');
      const price = parseFloat(cardPrice.textContent);
      const discount = elem.querySelector('.card-sale');

      // если выбран
      if (elem.parentNode.showed) {
        // фильтр по цене
        if ((min.value && price < min.value) || (max.value && price > max.value)) {
          elem.parentNode.style.display = 'none';

          // фильтр по акциям
        } else if (discountCheckbox.checked && !discount) {
          elem.parentNode.style.display = 'none';

          // если ни для одного фильтра не указаны значения
        } else {
          elem.parentNode.style.display = '';
        }
      }
    }); 
  }
  // ---end фильтр по ценам и акциям

  // поиск
  // при нажатии на кнопку поиска
  searchBtn.addEventListener('click', () => {

    // создаётся регулярное выражение
    const searchText = new RegExp(search.value.trim(), 'i');

    // затем у каждой карточки
    cards.forEach((elem) => {

      // берётся оглавление
      const cardTitle = elem.querySelector('.card-title');

      // и идёт поиск вхождений регулярного выражения в полученном оглавлении
      if (!searchText.test(cardTitle.textContent)) {
        elem.parentNode.style.display = 'none';
      } else {
        elem.parentNode.style.display = '';
      }
    });
  });
  // ---end поиск
}