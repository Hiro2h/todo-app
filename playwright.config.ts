import { defineConfig } from '@playwright/test';

export default defineConfig({
  use: {
    headless: false,
    baseURL: 'https://wc-react-todo-app.netlify.app/',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});