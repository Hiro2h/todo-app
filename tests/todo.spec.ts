import { test, expect } from '@playwright/test';

const APP_URL = 'https://wc-react-todo-app.netlify.app';

test('Strona główna ładuje się poprawnie', async ({ page }) => {
    await page.goto(APP_URL);
    await expect(page).toHaveTitle(/TODO/i);
});

test('Dodawanie nowego zadania', async ({ page }) => {
  await page.goto(APP_URL);
  await page.click('button:has-text("Add Task")');
  const modalForm = page.locator('.modal_form__9A5Bj');
  await modalForm.waitFor({ state: 'visible' });
  await page.fill('#title', 'Moje nowe zadanie');
  const addTaskButtonInModal = modalForm.locator('button:has-text("Add Task")');
  await addTaskButtonInModal.click()
  await expect(page.locator('text=Moje nowe zadanie')).toBeVisible();
  await expect(page.locator('text=Task added successfully')).toBeVisible();
});

test('Niepoprawne dane w polu tekstowym', async ({ page }) => {
  await page.goto(APP_URL);
  await page.click('button:has-text("Add Task")');
  const modalForm = page.locator('.modal_form__9A5Bj');
  await page.fill('#title', '<script>alert("ALERT!")</script>');
  const addTaskButtonInModal = modalForm.locator('button:has-text("Add Task")');
  await addTaskButtonInModal.click()
  await expect(page.locator('text=<script>alert("ALERT!")</script>')).toBeVisible();
  await expect(page.locator('text=Task added successfully')).toBeVisible();
});

test('Usuwanie zadania', async ({ page }) => {
	//dodajemy zadanie jak w pierwszym tescie
    await page.goto(APP_URL);
    await page.click('button:has-text("Add Task")');
    const modalForm = page.locator('.modal_form__9A5Bj');
    await modalForm.waitFor({ state: 'visible' });
    await page.fill('#title', 'Zadanie nowe');
    const addTaskButtonInModal = modalForm.locator('button:has-text("Add Task")');
    await addTaskButtonInModal.click();
    //usuwanie
    const editButton = page.locator('div[role="button"] svg path[d^="M6"]');
    await editButton.click();
    await expect(page.locator('text=Todo Deleted Successfully')).toBeVisible();
});

test.skip('Edycja danych istniejącego zadania', async ({ page }) => {
	//dodajemy zadanie jak w poprzednim tescie
    await page.goto(APP_URL);
    await page.click('button:has-text("Add Task")');
    const modalForm = page.locator('.modal_form__9A5Bj');
    await modalForm.waitFor({ state: 'visible' });
    await page.fill('#title', 'Zadanie nowe');
    const addTaskButtonInModal = modalForm.locator('button:has-text("Add Task")');
    await addTaskButtonInModal.click();
    await expect(modalForm).not.toBeVisible();

    const editButton = page.locator('div[role="button"] svg path[d^="M3"]');
    await editButton.click(); //tu w zasadzie powinien wybrać drugi div, ale leci w kulki i sobie usuwa task

    /*const taskTitle = 'Zadanie nowe';
    await page.waitForSelector(`p.todoItem_todoText__j68oh:has-text("${taskTitle}")`);
    const taskItem = page.locator(`.todoItem_item__fnR7B:has(p.todoItem_todoText__j68oh:has-text("${taskTitle}"))`);
    const editButton = taskItem.locator('.todoItem_todoActions__CuQMN .todoItem_icon__+DYyU:has(svg path[d^="M3"])');
    await editButton.click();*/

	/*const taskItem = page.locator(`.todoItem_item__fnR7B:has(p.todoItem_todoText__j68oh:has-text("${taskTitle}"))`);
	const editButtons = taskItem.locator('.todoItem_todoActions__CuQMN .todoItem_icon__+DYyU');
	const editButton = editButtons.nth(1); // wybieram drugi div z danej klasy
	console.log(await page.locator('div[role="button"] svg path').allInnerTexts());
	await editButton.click();*/

    await page.fill('#title', 'Zadanie po edycji');
    await page.selectOption('select', 'Completed');
    const updateTaskButtonInModal = modalForm.locator('button:has-text("Update Task")');
    await updateTaskButtonInModal.click();
    await expect(page.locator('text=Zadanie po edycji')).toBeVisible();
    await expect(page.locator('text=Completed')).toBeVisible();
    await expect(page.locator('text=Task Updated successfully')).toBeVisible();
}); //na tym etapie zgłosiłbym błąd w postaci braku, np ID dla tworzonych przycisków usuwania i edycji, przez co nie mogę napisać szybko kodu

test('Filtrowanie zadań', async ({ page }) => {
	await page.goto(APP_URL);
	await page.click('button:has-text("Add Task")');
	const modalForm1 = page.locator('.modal_form__9A5Bj');
	await modalForm1.waitFor({ state: 'visible' });
	await page.fill('#title', 'Moje nowe pierwsze zadanie');
	const addTaskButtonInModal1 = modalForm1.locator('button:has-text("Add Task")');
	await addTaskButtonInModal1.click()

	await page.click('button:has-text("Add Task")');
	const modalForm2 = page.locator('.modal_form__9A5Bj');
	await modalForm2.waitFor({ state: 'visible' });
	await page.fill('#title', 'Moje nowe drugie zadanie');
	const addTaskButtonInModal2 = modalForm2.locator('button:has-text("Add Task")');
	await addTaskButtonInModal2.click()

	await page.click('button:has-text("Add Task")');
	const modalForm3 = page.locator('.modal_form__9A5Bj');
	await modalForm3.waitFor({ state: 'visible' });
	await page.fill('#title', 'Moje nowe zadanie trzecie GOTOWE');
	await page.selectOption('#type', 'complete')
	const addTaskButtonInModal3 = modalForm3.locator('button:has-text("Add Task")');
	await addTaskButtonInModal3.click()

	await page.selectOption('#status', 'all');
	await page.waitForSelector(`p.todoItem_todoText__j68oh:has-text("Moje nowe pierwsze zadanie")`);
	await page.waitForSelector(`p.todoItem_todoText__j68oh:has-text("Moje nowe drugie zadanie")`);
	await page.waitForSelector(`p.todoItem_todoText__j68oh:has-text("Moje nowe zadanie trzecie GOTOWE")`);

	await page.waitForTimeout(1000);

	await page.selectOption('#status', 'incomplete');
	await page.waitForSelector(`p.todoItem_todoText__j68oh:has-text("Moje nowe pierwsze zadanie")`);
	await page.waitForSelector(`p.todoItem_todoText__j68oh:has-text("Moje nowe drugie zadanie")`);

	await page.waitForTimeout(1000);

	await page.selectOption('#status', 'complete');
	await page.waitForSelector(`p.todoItem_todoText__j68oh:has-text("Moje nowe zadanie trzecie GOTOWE")`);

	await page.waitForTimeout(1000);
});


test('Wykorzystanie checkboxa do zmiany statusu zadania', async ({ page }) => {
	await page.goto(APP_URL);
	await page.click('button:has-text("Add Task")');
	const modalForm = page.locator('.modal_form__9A5Bj');
	await modalForm.waitFor({ state: 'visible' });
	await page.fill('#title', 'Moje nowe zadanie');
	const addTaskButtonInModal = modalForm.locator('button:has-text("Add Task")');
	await addTaskButtonInModal.click()
	await expect(page.locator('text=Moje nowe zadanie')).toBeVisible();
	await expect(page.locator('text=Task added successfully')).toBeVisible();

	const checkboxDiv = page.locator('.todoItem_svgBox__z1vm6');
	await expect(checkboxDiv.locator('svg path')).toHaveAttribute('opacity', '0');
	await page.waitForTimeout(1000);
	await checkboxDiv.click();
	await expect(checkboxDiv.locator('svg path')).toHaveAttribute('opacity', '1');
	await page.waitForTimeout(1000);
	await checkboxDiv.click();
	await expect(checkboxDiv.locator('svg path')).toHaveAttribute('opacity', '0');
});