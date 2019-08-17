export default function renderCatalog() {
  const cards = document.querySelectorAll('.goods .card');
  const catalogList = document.querySelector('.catalog-list');
  const catalogButton = document.querySelector('.catalog-button');
  const catalogWrapper = document.querySelector('.catalog');

  // создаём коллекцию
  const categories = new Set();

  // добавляем в коллекцию все категории, которые есть
  // при этом, в коллекцию каждая категория добавится только один раз
  cards.forEach((elem) => {
    categories.add(elem.dataset.category); // у коллекций есть свои методы
  });

  // добавляюем категорию "Все товары"
  categories.add('Все товары');

  // добавляем категории в каталог
  categories.forEach((elem) => {
    const li = document.createElement('li');
    li.textContent = elem;
    catalogList.appendChild(li);
  });

  // обработка события клик на кнопку "Каталог"
  catalogButton.addEventListener('click', () => {
    if (catalogWrapper.style.display) {
      catalogWrapper.style.display = '';
    } else {
      catalogWrapper.style.display = 'block';
    }

    // при выборе категории будут отображаться только товары,
    // которые относятся к этой категории
    if (event.target.tagName === 'LI') {
      cards.forEach((elem) => {
        if ((elem.dataset.category !== event.target.textContent) && (event.target.textContent !== 'Все товары')) {
          elem.parentNode.style.display = 'none';
          elem.parentNode.showed = '';
        }
        else {
          elem.parentNode.style.display = '';
          elem.parentNode.showed = 'true';
        }
      });
    }
  });
}