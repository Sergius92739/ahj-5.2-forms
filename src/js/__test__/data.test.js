import Data from '../Data';

const data = new Data();

test('Метод create должен добавить в память объект товара с корректными данными', () => {
  const received = { id: 11111, name: 'iPhone', cost: 80000 };
  data.create(11111, 'iPhone', '80000');
  expect(data.memory[3]).toEqual(received);
});

test('Метод update должен изменить данные объекта товара в памяти', () => {
  const received = { id: 11111, name: 'iPhone', cost: 50000 };
  data.update(11111, 'iPhone', 50000);
  expect(data.memory[3]).toEqual(received);
});

test('Метод read должен вернуть объект из памяти без удаления', () => {
  const received = { id: 11111, name: 'iPhone', cost: 50000 };
  expect(data.read(11111)).toEqual(received);
  expect(data.memory[3]).toEqual(received);
});

test('Метод delete должен удалить объект из памяти', () => {
  data.delete(11111);
  expect(data.memory.length).toBe(3);
});
