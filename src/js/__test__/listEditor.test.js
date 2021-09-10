import ListEditor from '../ListEditor';

const editor = new ListEditor();

test('Метод bindToDOM должен выбросить ошибку', () => {
  expect(() => editor.bindToDOM(null)).toThrowError();
});

test('Метод bindToDOM должен прибиндить editor к DOM', () => {
  editor.bindToDOM(document.body);
  expect(editor.container).toEqual(document.body);
});

test('Метод должен отрисовать стартовую разметку приложения', () => {
  editor.drawUI();
  expect(editor.container.innerHTML.length).toBe(3007);
  expect(editor.container.firstElementChild.className).toBe('container');
});

describe('Проверка подключения обработчиков собыитий', () => {
  const eventSubmit = new Event('submit');
  const eventChange = new Event('change');

  test('При клике на + должен быть вызван метод showAdding', () => {
    editor.addChangePopup.showAdding = jest.fn();
    editor.toAppoint();
    editor.addButton.click();
    expect(editor.addChangePopup.showAdding).toBeCalled();
  });

  test('При событии submit должен быть вызван метод onSubmit', () => {
    editor.onSubmit = jest.fn();
    editor.form.dispatchEvent(eventSubmit);
    expect(editor.onSubmit).toBeCalled();
  });

  test('При событии change должен быть вызван метод onChange', () => {
    editor.onChange = jest.fn();
    editor.form.elements[0].dispatchEvent(eventChange);
    expect(editor.onChange).toBeCalled();
  });

  test('При событии change должен быть вызван метод onChange', () => {
    editor.onChange = jest.fn();
    editor.form.elements[1].dispatchEvent(eventChange);
    expect(editor.onChange).toBeCalled();
  });

  test('При клике на кнопку редактировать должен быть вызван метод onActionsClick', () => {
    editor.onActionsClick = jest.fn();
    document.querySelector('span[data-name="editing"]').click();
    expect(editor.onActionsClick).toBeCalled();
  });

  test('При клике на кнопку удалить должен быть вызван метод onActionsClick', () => {
    editor.onActionsClick = jest.fn();
    document.querySelector('span[data-name="delete"]').click();
    expect(editor.onActionsClick).toBeCalled();
  });

  test('При клике на кнопку попапа подтверждения удалить должен быть вызван метод onConfirmPopupClick', () => {
    editor.onConfirmPopupClick = jest.fn();
    document.querySelector('.button[data-name="yes"]').click();
    expect(editor.onConfirmPopupClick).toBeCalled();
  });

  test('При клике на кнопку попапа подтверждения Отменить должен быть вызван метод onConfirmPopupClick', () => {
    editor.onConfirmPopupClick = jest.fn();
    document.querySelector('.button[data-name="no"]').click();
    expect(editor.onConfirmPopupClick).toBeCalled();
  });
});
