'use strict';

// чекбоксы
function toggleChackbox() {

  const checkbox = document.querySelectorAll('.filter-check_checkbox');

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
// end чекбоксы

// показ/закрытие корзины
function toggleCart() {

  const btnCart = document.getElementById('cart');
  const modalCart = document.querySelector('.cart');
  const closeBtn = document.querySelector('.cart-close');
  
  btnCart.addEventListener('click', () => {
    modalCart.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
  
  closeBtn.addEventListener('click', () => {
    modalCart.style.display = 'none';
    document.body.style.overflow = '';
  });
}
// end показ/закрытие корзины

// добавление и удаление товаров из корзины
function goodsInOutCart() {

  const cards = document.querySelectorAll('.goods .card'),
  cartWrapper = document.querySelector('.cart-wrapper'),
  cartEmpty = document.getElementById('cart-empty'),
  cardsCartCount = document.querySelector('.counter');
  
  cards.forEach((card) => {
    const btn = card.querySelector('button');

    //можно сделать с помощью делегирования, что более эффективно
    btn.addEventListener('click', () => {
      const cardClone = card.cloneNode(true);
      cartWrapper.appendChild(cardClone);
      
      showData();
      const removeBtn = cardClone.querySelector('.btn');
      removeBtn.textContent = 'Удалить из корзины';

      removeBtn.addEventListener('click', () => {
        cardClone.remove();
        showData();
      });
    });
  });
  
  function showData() {

    const cardsCount = cartWrapper.querySelectorAll('.card'),
    cardPrice = cartWrapper.querySelectorAll('.card-price'),
    totalPrice = document.querySelector('.cart-total span');
    let sum = 0;
    
    cardsCartCount.textContent = cardsCount.length;
    
    cardPrice.forEach((elem) => {
      let price = parseFloat(elem.textContent);
      sum += price;
    });
    
    totalPrice.textContent = sum;
    
    if (cardsCount.length != 0) {
      cartEmpty.remove();
    }
    else {
      cartWrapper.appendChild(cartEmpty);
    }
  }
}
// end добавление и удаление товаров из корзины

// фильры
function filters() {

  const cards = document.querySelectorAll('.goods .card'),
  discountCheckbox = document.getElementById('discount-checkbox'),
  goods = document.querySelector('.goods'),
  min = document.getElementById('min'),
  max = document.getElementById('max'),
  search = document.querySelector('.search-wrapper_input'),
  searchBtn = document.querySelector('.search-btn');
  
  // фильтр по акциям
  discountCheckbox.addEventListener('click', () => {
    cards.forEach((elem) => {
      if (discountCheckbox.checked) {
        if (!elem.querySelector('.card-sale')) {
          elem.parentNode.style.display = 'none';
        }
      } else {
        elem.parentNode.style.display = '';
      }
    });
  });

  // фильтр по ценам
  function filterPrice() {

    cards.forEach((elem) => {
      const cardPrice = elem.querySelector('.card-price');
      const price = parseFloat(cardPrice.textContent);

      if ((min.value && price < min.value) || (max.value && price > max.value)) {
        elem.parentNode.remove();
      } else {
        goods.appendChild(elem.parentElement);
      }
    });
  }

  min.addEventListener('input', filterPrice);
  max.addEventListener('input', filterPrice);
  
  //поиск
  searchBtn.addEventListener('click', () => {
    const searchText = new RegExp(search.value.trim(), 'i');
    cards.forEach((elem) => {
      const cardTitle = elem.querySelector('.card-title');

      if (!searchText.test(cardTitle.textContent)) {
        elem.parentNode.style.display = 'none';
      } else {
        elem.parentNode.style.display = '';
      }
    });
  });
}
// end фильры

toggleChackbox();
toggleCart();
goodsInOutCart();
filters();