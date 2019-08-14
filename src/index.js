'use strict';

// чекбоксы
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
// end чекбоксы

// показ/закрытие корзины
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
// end показ/закрытие корзины

// добавление и удаление товаров из корзины
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
    
    cartEmpty.remove();
    showData();
  });
});

function showData() {
  const cardsCount = cartWrapper.querySelectorAll('.card');
  cardsCartCount.textContent = cardsCount.length;
}
// end добавление и удаление товаров из корзины