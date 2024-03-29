'use strict';

import getData from './modules/getData';
import renderCards from './modules/renderCards';
import renderCatalog from './modules/renderCatalog';
import toggleCheckbox from './modules/toggleCheckbox';
import toggleCart from './modules/toggleCart';
import goodsPutInOutCart from './modules/goodsPutInOutCart';
import filters from './modules/filters';

// вызов всех модулей
// самовызывающаяся функция
(async function () {
  const db = await getData();
  renderCards(db);
  renderCatalog();
  toggleCheckbox();
  toggleCart();
  goodsPutInOutCart();
  filters();
}());
// ---end вызов всех модулей

// РАБОТА С WEBPACK

// npm init -y
// npm i webpack webpack-cli -D
// npx webpack
