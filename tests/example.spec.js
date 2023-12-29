import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://100r-student.starkovgrp.ru/Client/#/'); //http://localhost/Client
  await page.getByPlaceholder('Name').click();
  await page.getByPlaceholder('Name').fill('Administrator');
  await page.getByPlaceholder('Password').click();
  await page.getByPlaceholder('Password').fill('111111');
  await page.getByPlaceholder('Password').press('Enter');
  const page1Promise = page.waitForEvent('popup');
  await page.getByTitle('Show help').click(); // показать справку
  const page1 = await page1Promise;
});





