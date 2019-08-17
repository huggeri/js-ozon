export default function renderCards(data) {

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
        ${/* ---акция?--- */oneGood.sale ? `<div class="card-sale">🔥Hot Sale🔥</div>` : ``}
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
    // добавляем своёство showed, обозначающее, выведена ли карточка на экран
    card.showed = 'true';
  });
}