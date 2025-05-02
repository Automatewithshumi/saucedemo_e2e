import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
dotenv.config();

const { 
  LoginPage, 
  InventoryPage, 
  CartPage, 
  CheckoutInfoPage, 
  CheckoutOverviewPage, 
  CheckoutCompletePage 
} = require('../pages/sauceDemo.page.js'); 

// Enable trace recording for this test
test.use({ trace: 'on' });

test('Sauce Demo E2E Shopping Flow', async ({ page }) => {
  // Initialize page objects
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const cartPage = new CartPage(page);
  const checkoutInfoPage = new CheckoutInfoPage(page);
  const checkoutOverviewPage = new CheckoutOverviewPage(page);
  const checkoutCompletePage = new CheckoutCompletePage(page);

  await test.step('Navigate to login page and verify logo', async () => {
    await loginPage.navigateTo();
    await expect(await loginPage.isLogoVisible()).toBeTruthy();
  });

  await test.step('Login with valid credentials and verify navigation to inventory', async () => {
    // Using credentials from environment variables
    const username = process.env.SAUCE_USERNAME;
    const password = process.env.SAUCE_PASSWORD;
    await loginPage.login(username, password);
    await expect(await inventoryPage.getTitle()).toBe('Products');
  });

  await test.step('Add items to cart and verify buttons update', async () => {
    await inventoryPage.addBackpackToCart();
    await expect(await inventoryPage.isRemoveBackpackButtonVisible()).toBeTruthy();
    await inventoryPage.addTShirtToCart();
    await expect(await inventoryPage.isRemoveTShirtButtonVisible()).toBeTruthy();
  });

  await test.step('Go to cart and validate items and count', async () => {
    await inventoryPage.goToCart();
    await expect(await cartPage.getCartItemsCount()).toBe(2);
    await expect(await cartPage.isItemVisible('Sauce Labs Backpack')).toBeTruthy();
    await expect(await cartPage.isItemVisible('Sauce Labs Bolt T-Shirt')).toBeTruthy();
    await expect(await cartPage.isItemPriceVisible('$29.99')).toBeTruthy();
    await expect(await cartPage.isItemPriceVisible('$15.99')).toBeTruthy();
  });

  await test.step('Proceed to checkout and fill user information', async () => {
    await cartPage.proceedToCheckout();
    await expect(await checkoutInfoPage.getTitle()).toBe('Checkout: Your Information');
    await checkoutInfoPage.fillCheckoutInfo('Jane', 'Doe', '12345');
    await expect(await checkoutOverviewPage.getTitle()).toBe('Checkout: Overview');
  });

  await test.step('Verify checkout subtotal and complete the order', async () => {
    const subtotalText = await checkoutOverviewPage.getSubtotalText();
    expect(subtotalText).toContain('$45.98');
    await checkoutOverviewPage.completeOrder();
    await expect(await checkoutCompletePage.getTitle()).toBe('Checkout: Complete!');
  });

  await test.step('Verify confirmation message and take screenshot', async () => {
    await expect(await checkoutCompletePage.getConfirmationMessage()).toBe('Thank you for your order!');
    await checkoutCompletePage.takeScreenshot('sauce-demo-confirmation.png');
  });
});
