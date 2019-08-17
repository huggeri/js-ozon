export default function goodsPutInOutCart() {

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