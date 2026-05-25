const { test, expect } = require('@playwright/test');
const path = require('path');

const url = `file://${path.resolve(__dirname, '../index.html')}`;

test.describe('Проверка формы регистрации', () => {
    
    test('Заголовок страницы корректен', async ({ page }) => {
        await page.goto(url);
        await expect(page).toHaveTitle(/Форма регистрации/);
    });

    test('Поля ввода отображаются', async ({ page }) => {
        await page.goto(url);
        const username = page.locator('#username');
        const email = page.locator('#email');
        await expect(username).toBeVisible();
        await expect(email).toBeVisible();
    });

    test('Кнопка имеет правильный текст', async ({ page }) => {
        await page.goto(url);
        const btn = page.locator('#submit-btn');
        await expect(btn).toHaveText('Зарегистрироваться');
    });

    test('Появление сообщения об успехе при отправке', async ({ page }) => {
        await page.goto(url);
        await page.fill('#username', 'testuser');
        await page.fill('#email', 'test@example.com');
        await page.click('#submit-btn');
        const msg = page.locator('#success-msg');
        await expect(msg).toBeVisible();
    });
});