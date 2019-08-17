'use strict';

// чекбоксы
function toggleChackbox() {

  // делаем массив с чекбоксами
  const checkbox = document.querySelectorAll('.filter-check_checkbox');

  // создаём для каждого элемента в массиве обработчик события изменение
  // и добавляем класс checked
  checkbox.forEach((elem) => {
    elem.addEventListener('change', function() {
      if(this.checked) {
        this.nextElementSibling.classList.add('checked');
      } else {
        this.nextElementSibling.classList.remove('checked');
      }
    });
  });
}
// ---end чекбоксы

// показ/закрытие корзины
function toggleCart() {

  const btnCart = document.getElementById('cart');
  const modalCart = document.querySelector('.cart');
  const closeBtn = document.querySelector('.cart-close');
  
  // обработка события нажатие на кнопку корзина
  btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });

  // обработка события нажатие на кнопку закрытия корзины
  closeBtn.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
  });
}
// ---end показ/закрытие корзины

// добавление и удаление товаров из корзины
function goodsPutInOutCart() {

  const cards = document.querySelectorAll('.goods .card'),
  cartWrapper = document.querySelector('.cart-wrapper'),
  cartEmpty = document.getElementById('cart-empty'),
  cardsCartCount = document.querySelector('.counter');
  
  // добавляем обработку события нажатие на кнопки в каждой карточке
  cards.forEach((card) => {
    const btn = card.querySelector('button');
    
    // обработка события нажатие на кнопку "В корзину" 
    // можно сделать с помощью делегирования, что более эффективно
    btn.addEventListener('click', () => {

      // при нажатии на кнопку "В корзину" создаётся клон карточки, которого добавляем в каорзину
      const cardClone = card.cloneNode(true);
      cartWrapper.appendChild(cardClone);
      
      showData();

      // у клона карточки находим кнопку "Удалить из корзины"
      const removeBtn = cardClone.querySelector('.btn');
      removeBtn.textContent = 'Удалить из корзины';

      // и на эту кнопку вешаем обработчик события клик
      removeBtn.addEventListener('click', () => {
        cardClone.remove();
        showData();
      });
    });
  });
  
  // показать суммарную цену и кличество товаров в корзине
  function showData() {

    const cardsCount = cartWrapper.querySelectorAll('.card'),
    cardPrice = cartWrapper.querySelectorAll('.card-price'),
    totalPrice = document.querySelector('.cart-total span');
    let sum = 0;
    
    // меняем счётчик товаров
    cardsCartCount.textContent = cardsCount.length;
    
    // считаем сумму заказа
    cardPrice.forEach((elem) => {
      let price = parseFloat(elem.textContent);
      sum += price;
    });
    
    // выводим сумму заказа в корзине
    totalPrice.textContent = sum;
    
    // если корзина пуста, добыавляем надпись об этом, если нет - удаляем надпись
    if (cardsCount.length != 0) {
      cartEmpty.remove();
    }
    else {
      cartWrapper.appendChild(cartEmpty);
    }
  }
  // ---end показать суммарную цену и кличество товаров в корзине
}
// ---end добавление и удаление товаров из корзины

// фильры
function filters() {

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
// ---end фильры

// получение данных с сервера
function getData() {

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
// ---end получение данных с сервера

// выводим карточки товара
function renderCards(data) {

  // берём обёртку контейнера, где лежат все товары
  const goodsWrapper = document.querySelector('.goods');

  // берём наши данные из бд, берём там объект goods и 
  // для каждого элемента совершаем следующие действия
  data.goods.forEach((oneGood) => {

    // создаём контейнер
    const card = document.createElement('div');

    // доабвляем ему стили
    card.className = 'col-12 col-md-6 col-lg-4 col-xl-3';

    // добавляем вёрстку содержимого
    card.innerHTML = `
      <div class="card" data-category="${oneGood.category}">
        ${/* ---распродажа?--- */oneGood.sale ? `<div class="card-sale">🔥Hot Sale🔥</div>` : ``}
        <div class="card-img-wrapper">
          <span class="card-img-top"
            style="background-image: url('${/* ---здесь JAVASCRIPT код--- */ oneGood.img}')"></span>
        </div>
        <div class="card-body justify-content-between">
          <div class="card-price" style="${oneGood.sale ? `color:red` : ``}">${oneGood.price} ₽</div>
          <h5 class="card-title">${oneGood.title}</h5>
          <button class="btn btn-primary">В корзину</button>
        </div>
      </div>
    `;

    // добавляем получившийся объект на страницу
    goodsWrapper.appendChild(card);
  });
}
// ---end выводим карточки товара

// создание каталога
function renderCatalog() {
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
        if (elem.dataset.category !== event.target.textContent) {
          elem.parentNode.style.display = 'none';
        }
        else {
          elem.parentNode.style.display = '';
        }
      });
    }
  });
}
// ---end создание каталога

// вызов всех модулей
getData().then((data) => {
  // выводим все карточки из data, возвращённые функцией getData()
  renderCards(data);
  
  // вызываем сотальные функции
  toggleChackbox();
  toggleCart();
  goodsPutInOutCart();
  filters();
  renderCatalog();
});
// ---end вызов всех модулей