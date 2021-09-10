import AddChangePopup from '../AddChangePopup';

const popup = new AddChangePopup();

test('Метод creat должет вставить html-разметку в DOM', () => {
  popup.creat();
  expect(document.body.firstElementChild.className).toBe('popup');
  expect(document.body.firstElementChild.innerHTML).toBe(AddChangePopup.markUP());
});

test('Метод showAdding должен добавить классы open и d_none', () => {
  popup.showAdding();
  expect(popup.sample.className).toBe('popup open');
  expect(document.querySelector('.button[data-name="change"]').className).toBe('button d_none');
});

test('Метод showUpdate должен добавить классы open и d_none', () => {
  popup.showUpdate();
  expect(popup.sample.className).toBe('popup open');
  expect(document.querySelector('.button[data-name="save"]').className).toBe('button d_none');
});

test('Метод hide должен удалить класс open', () => {
  popup.hide();
  expect(popup.sample.className).toBe('popup');
});
