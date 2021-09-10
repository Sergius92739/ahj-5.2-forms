import ConfirmPopup from '../ConfirmPopup';

const popup = new ConfirmPopup();

test('Метод creat должен создать и вставить попап в DOM', () => {
  popup.creat('Вы уверены?', 'удалить', 'отменить', 'test');
  expect(document.body.firstElementChild.innerHTML).toBe(ConfirmPopup.markUP('Вы уверены?', 'удалить', 'отменить'));
});

test('Метод getPopup должен вернуть попап', () => {
  expect(popup.getPopup('test')).toEqual(popup.list[0]);
});

test('Метод showPopup должен добавить класс open', () => {
  popup.showPopup('test');
  expect(popup.list[0].className).toBe('popup open');
});

test('Метод hidePopup должен удалить класс open', () => {
  popup.hidePopup('test');
  expect(popup.list[0].className).toBe('popup');
});

test('Метод delete должен удалить попап', () => {
  popup.delete('test');
  expect(popup.list.length).toBe(0);
});
