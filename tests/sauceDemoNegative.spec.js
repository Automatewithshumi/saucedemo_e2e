import { test, expect } from '@playwright/test';

test.use({ trace: 'on' });

test('Login with invalid credentials', async ({ page }) => {
  try {
    await test.step('Navigate to login page', async () => {
      await page.goto('https://www.saucedemo.com');
      await expect(page.locator('.login_logo')).toBeVisible();
    });

    await test.step('Attempt login with wrong username/password', async () => {
      await page.locator('[data-test="username"]').fill('invalid_user');
      await page.locator('[data-test="password"]').fill('wrong_password');
      await page.locator('[data-test="login-button"]').click();
    });

    await test.step('Verify error message is displayed', async () => {
      const errorMessage = page.locator('[data-test="error"]');
      await expect(errorMessage).toBeVisible();
      await expect(errorMessage).toContainText('Username and password do not match');
    });

    console.log('✅ Successfully verified invalid login error handling');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    await page.screenshot({ path: 'error-invalid-login.png' });
    throw error;
  }
});
