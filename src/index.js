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
toggleChackbox();
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
toggleCart();
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
goodsInOutCart();
// end добавление и удаление товаров из корзины