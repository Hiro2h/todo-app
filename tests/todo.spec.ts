import { test, expect } from '@playwright/test';

test('Strona główna ładuje się poprawnie', async ({ page }) => {
    await page.goto('https://wc-react-todo-app.netlify.app/'); // Zamień na właściwy adres swojej aplikacji
    await expect(page).toHaveTitle(/TODO/i);
});