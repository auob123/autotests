const URL = 'https://100r-student.starkovgrp.ru/Client/#/';

async function openLoginPage(page) {
  await page.goto(URL);
}

async function inputUsername(page, username) {
  await page.fill('input[placeholder="Name"]', username);
}

async function inputPassword(page, password) {
  await page.fill('input[placeholder="Password"]', password);
}

async function performLogin(page, username, password) {
  await openLoginPage(page);
  await inputUsername(page, username);
  await inputPassword(page, password);
  await page.press('input[placeholder="Password"]', 'Enter');
  // await page.waitForTimeout(20000);
}

async function checkHelpPopup(page) {
  const page1Promise = page.waitForEvent('popup');
  await page.getByTitle('Show help').click(); 
  const page1 = await page1Promise;
  await page.waitForTimeout(10000);
}

async function create_doc(page, Name, Subject) {
  await page.getByText('Create', { exact: true }).click();
  await page.getByText('Simple Document').click();
  await page.locator('#control_TextEditorToText_fc50c888-3155-4ff1-96e8-ff7064894ead').getByRole('textbox').fill(Name);
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill(Subject);
  await page.getByTitle('Save changes (Ctrl+S)').click();
  await page.waitForTimeout(10000);
}


module.exports = {
  performLogin,
  checkHelpPopup,
  create_doc,
};

