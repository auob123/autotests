import { test } from '@playwright/test';
import { performLogin,checkHelpPopup, create_doc } from './Functions';

test('login', async ({ page }) => {
  await performLogin(page, 'Administrator', '111111');
});

test('relogin', async ({ page }) => {
    await performLogin(page, 'Service User', '111111');
  });


test('checking help', async ({ page }) => {
    await performLogin(page, 'Administrator', '111111');
    await checkHelpPopup(page);
  });

  test('create document', async ({ page }) => {
    await performLogin(page, 'Administrator', '111111');
    await create_doc(page, 'test', 'training');
  }); 

  test('create document 2', async ({ page }) => {
    await performLogin(page, 'Administrator', '111111');
    await create_doc(page, 'test1', 'training2');
  }); 
  test('create document ', async ({ page }) => {
    await performLogin(page, 'Administrator', '111111');
    await create_doc(page, 'test', 'training');
  }); 

  //инструкции для терминала
  //для посмотрение действия :   npx playwright test Framework.spec.js --project=chromium --debug
  // для откервание отчета   :   npx playwright show-report

