import puppetteer from 'puppeteer';

const childProcess = require('child_process');

jest.setTimeout(30000);
describe('Редактор списка', () => {
  let browser = null;
  let page = null;
  let server = null;

  const baseUrl = 'http://localhost:9000';
  beforeAll(async () => {
    server = await childProcess.fork(`${__dirname}/e2e.server.js`);
    await new Promise((resolve, reject) => {
      server.on('error', () => {
        reject();
      });
      server.on('message', (message) => {
        if (message === 'ok') {
          resolve();
        }
      });
    });
    browser = await puppetteer.launch({
      /* headless: true,
      slowMo: 100,
      devtools: false, */
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
    server.kill();
  });

  describe('Редактор списка', () => {
    test('Открытие основной страницы', async () => {
      await page.goto(baseUrl);
    });

    test('должен добавить класс open у попапа добавления товара', async () => {
      await page.goto(baseUrl);
      const buttonAdding = await page.$('.products__add');
      buttonAdding.click();
      await page.waitForSelector('#popup.open');
      await page.waitForSelector('.button[data-name="change"].d_none');
    });

    test('должен добавить класс open у попапа подтверждения', async () => {
      await page.goto(baseUrl);
      const btnDelete = await page.$('span[data-name="delete"]');
      btnDelete.click();
      await page.waitForSelector('#confirm.popup.open');
    });

    test('должен добавить класс open у попапа редактирования', async () => {
      await page.goto(baseUrl);
      const btnEdit = await page.$('span[data-name="editing"]');
      btnEdit.click();
      await page.waitForSelector('#popup.popup.open');
    });
  });
});
