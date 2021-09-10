import AddChangePopup from './AddChangePopup';
import ConfirmPopup from './ConfirmPopup';
import Data from './Data';
import Tooltip from './Tooltip';

export default class ListEditor {
  constructor() {
    this.container = null;
    this.data = new Data();
    this.products = null;
    this.form = null;
    this.titleField = null;
    this.costField = null;
    this.addButton = null;
    this.addChangePopup = new AddChangePopup();
    this.confirmPopup = new ConfirmPopup();
    this.tooltip = new Tooltip();
    this.quantity = null;
    this.curId = null;
    this.curTooltipID = null;
  }

  init() {
    this.drawUI();
    this.toAppoint();
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }
    this.container = container;
  }

  static get startMarkUp() {
    return `<div class="container">
           <div class="products">
             <div class="products__body">
               <table class="products__list">
                 <caption class="products__title">Товары<span class="products__add"></span></caption>
                 <thead class="products__head">
                   <tr>
                     <th>Наименование </th>
                     <th>Стоимость </th>
                     <th>Действия</th>
                   </tr>
                 </thead>
                 <tbody class="products__tbody">
                   <tr id="69650237">
                     <td data-name="name">iPhone XR</td>
                     <td data-name="cost">60000</td>
                     <td><span data-name="editing"></span><span data-name="delete"></span></td>
                   </tr>
                   <tr id="69650247">
                     <td data-name="name">Samsung Galaxy S10+</td>
                     <td data-name="cost">80000</td>
                     <td><span data-name="editing"></span><span data-name="delete"></span></td>
                   </tr>
                   <tr id="69650257">
                     <td data-name="name">Huawei View</td>
                     <td data-name="cost">50000</td>
                     <td><span data-name="editing"></span><span data-name="delete"></span></td>
                   </tr>
                 </tbody>
                 <tfoot class="products__footer">
                   <tr>
                     <th scope="row" colspan="2">Всего товаров:</th>
                     <th class="quantity" colspan="1">3</th>
                   </tr>
                 </tfoot>
               </table>
             </div>
           </div>
         </div>`;
  }

  drawUI() {
    this.checkBinding();
    this.container.innerHTML = ListEditor.startMarkUp;
    this.products = this.container.querySelector('.products__tbody');
    this.addChangePopup.creat();
    this.form = document.forms.adding;
    this.titleField = this.form.title;
    this.costField = this.form.cost;
    this.addButton = this.container.querySelector('.products__add');
    this.confirmPopup.creat('Вы действительно хотите удалить этот товар?', 'Удалить', 'Отменить', 'confirmDel');
    this.quantity = this.container.querySelector('.quantity');
  }

  toAppoint() {
    this.addButton.addEventListener('click', () => {
      this.addChangePopup.showAdding();
    });
    this.form.addEventListener('submit', (event) => this.onSubmit(event));
    [this.form.elements[0], this.form.elements[1]].forEach((e) => {
      e.addEventListener('change', () => this.onChange(e));
    });
    this.products.addEventListener('click', (event) => this.onActionsClick(event));
    this.addChangePopup.sample.addEventListener('click', (event) => this.onPopupEddingClick(event));
    this.confirmPopup.getPopup('confirmDel').addEventListener('click', (event) => this.onConfirmPopupClick(event));
  }

  onChange(elem) {
    if (elem.validity.valid) {
      this.tooltip.removeToolTip(this.curTooltipID);
    }
  }

  onConfirmPopupClick(event) {
    if (event.target.dataset.name === 'yes') {
      this.data.delete(this.curId);
      this.redrawDOM();
      this.confirmPopup.hidePopup('confirmDel');
    }
    if (event.target.dataset.name === 'no') {
      this.confirmPopup.hidePopup('confirmDel');
    }
  }

  onPopupEddingClick(event) {
    if (event.target.dataset.name === 'cancel') {
      event.preventDefault();
      this.hideAddChangePopup();
    }
    if (event.target.dataset.name === 'change') {
      if (!this.checkCost()) {
        this.tooltip.removeToolTip(this.curTooltipID);
        this.costField.focus();
        this.tooltip.creatTooltip('Невалидное значение цены', this.costField);
        this.curTooltipID = document.body.lastElementChild.dataset.id;
      } else {
        event.preventDefault();
        this.data.update(this.curId, this.titleField.value, this.costField.value);
        this.redrawDOM();
        this.hideAddChangePopup();
      }
    }
  }

  onActionsClick(event) {
    if (event.target.dataset.name === 'editing') {
      this.curId = +event.target.closest('tr').id;
      this.addChangePopup.showUpdate();
      this.titleField.value = this.data.read(this.curId).name;
      this.costField.value = this.data.read(this.curId).cost;
    }
    if (event.target.dataset.name === 'delete') {
      this.curId = +event.target.closest('tr').id;
      this.confirmPopup.showPopup('confirmDel');
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const first = [...this.form.elements].find((e) => !e.validity.valid);
    if (first) {
      first.focus();
      this.tooltip.removeToolTip(this.curTooltipID);
      this.tooltip.creatTooltip('Заполните пожалуйста это поле', first);
      this.curTooltipID = document.body.lastElementChild.dataset.id;
    } else if (!this.checkCost()) {
      this.tooltip.removeToolTip(this.curTooltipID);
      this.costField.focus();
      this.tooltip.creatTooltip('Невалидное значение цены', this.costField);
      this.curTooltipID = document.body.lastElementChild.dataset.id;
    } else {
      this.data.create(this.data.getId(), this.titleField.value, this.costField.value);
      this.tooltip.removeToolTip(this.curTooltipID);
      this.curTooltipID = null;
      this.hideAddChangePopup();
      this.redrawDOM();
    }
  }

  checkCost() {
    const temp = this.costField.value;
    if (temp.startsWith('0')) {
      return false;
    }
    if (+temp <= 0) {
      return false;
    }
    return true;
  }

  redrawDOM() {
    this.products.innerHTML = '';
    this.data.memory.forEach((e) => {
      this.products.insertAdjacentHTML('beforeend', `<tr id="${e.id}">
                                     <td data-name="name">${e.name}</td>
                                     <td data-name="cost">${e.cost}</td>
                                     <td><span data-name="editing"></span><span data-name="delete"></span></td>
                                   </tr>`);
    });
    this.quantity.textContent = this.data.memory.length;
  }

  hideAddChangePopup() {
    this.tooltip.removeToolTip(this.curTooltipID);
    this.addChangePopup.hide();
    this.form.reset();
  }

  checkBinding() {
    if (this.container === null) {
      throw new Error('ListEditor is not bind to DOM');
    }
  }
}
