export default class AddChangePopup {
  constructor(container = document.body) {
    this.container = container;
    this.sample = null;
  }

  static markUP() {
    return `<div class="popup__body">
    <div class="popup__content">
      <form name="adding" class="popup__form" novalidate="">
        <label class="popup__label">
          <div class="popup__name">Название</div>
          <input name="title" id="title" type="text" class="popup__input" required="">
        </label>
        <label class="popup__label">
          <div class="popup__name">Стоимость</div>
          <input name="cost" id="cost" type="number" class="popup__input" required="">
        </label>
        <div class="popup__buttons">
          <button name="save" data-name="save" class="button">Добавить</button>
          <button name="change" data-name="change" class="button">Редактировать</button>
          <button name="cancel" data-name="cancel" class="button">Отмена</button>
        </div>
      </form>
    </div>
  </div>`;
  }

  creat() {
    this.sample = document.createElement('div');
    this.sample.className = 'popup';
    this.sample.setAttribute('id', 'popup');
    this.sample.innerHTML = AddChangePopup.markUP();
    this.container.appendChild(this.sample);
  }

  showAdding() {
    this.sample.classList.add('open');
    this.sample.querySelector('.button[data-name="save"]').className = 'button';
    this.sample.querySelector('.button[data-name="change"]').className = 'button d_none';
  }

  showUpdate() {
    this.sample.classList.add('open');
    this.sample.querySelector('.button[data-name="save"]').className = 'button d_none';
    this.sample.querySelector('.button[data-name="change"]').className = 'button';
  }

  hide() {
    this.sample.classList.remove('open');
  }
}
