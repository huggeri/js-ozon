export default function toggleCheckbox() {

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