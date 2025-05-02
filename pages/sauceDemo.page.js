// sauceDemo.page.js

class BasePage {
  constructor(page) {
    this.page = page;
  }
}

class LoginPage extends BasePage {
  constructor(page) {
    super(page);
    this.url = 'https://www.saucedemo.com';
    this.selectors = {
      logo: '.login_logo',
      usernameInput: '[data-test="username"]',
      passwordInput: '[data-test="password"]',
      loginButton: '[data-test="login-button"]',
      errorMessage: '[data-test="error"]'
    };
  }

  async navigateTo() {
    await this.page.goto(this.url);
  }

  async isLogoVisible() {
    return await this.page.locator(this.selectors.logo).isVisible();
  }

  async login(username, password) {
    await this.page.locator(this.selectors.usernameInput).fill(username);
    await this.page.locator(this.selectors.passwordInput).fill(password);
    await this.page.locator(this.selectors.loginButton).click();
  }

  async getErrorMessage() {
    return await this.page.locator(this.selectors.errorMessage).textContent();
  }
}

class InventoryPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      title: '.title',
      addBackpackButton: '[data-test="add-to-cart-sauce-labs-backpack"]',
      removeBackpackButton: '[data-test="remove-sauce-labs-backpack"]',
      addTShirtButton: '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
      removeTShirtButton: '[data-test="remove-sauce-labs-bolt-t-shirt"]',
      cartIcon: '.shopping_cart_link'
    };
  }

  async getTitle() {
    return await this.page.locator(this.selectors.title).textContent();
  }

  async addBackpackToCart() {
    await this.page.locator(this.selectors.addBackpackButton).click();
  }

  async addTShirtToCart() {
    await this.page.locator(this.selectors.addTShirtButton).click();
  }

  async goToCart() {
    await this.page.locator(this.selectors.cartIcon).click();
  }

  async isRemoveBackpackButtonVisible() {
    return await this.page.locator(this.selectors.removeBackpackButton).isVisible();
  }

  async isRemoveTShirtButtonVisible() {
    return await this.page.locator(this.selectors.removeTShirtButton).isVisible();
  }
}

class CartPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      cartItems: '.cart_item',
      itemNames: '.inventory_item_name',
      itemPrices: '.inventory_item_price',
      checkoutButton: '[data-test="checkout"]'
    };
  }

  async getCartItemsCount() {
    return await this.page.locator(this.selectors.cartItems).count();
  }

  async isItemVisible(itemName) {
    const nameSelector = this.page.locator(this.selectors.itemNames).filter({ hasText: itemName });
    return await nameSelector.isVisible();
  }

  async isItemPriceVisible(price) {
    const priceSelector = this.page.locator(this.selectors.itemPrices).filter({ hasText: price });
    return await priceSelector.isVisible();
  }

  async proceedToCheckout() {
    await this.page.locator(this.selectors.checkoutButton).click();
  }
}

class CheckoutInfoPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      title: '.title',
      firstNameInput: '[data-test="firstName"]',
      lastNameInput: '[data-test="lastName"]',
      postalCodeInput: '[data-test="postalCode"]',
      continueButton: '[data-test="continue"]'
    };
  }

  async getTitle() {
    return await this.page.locator(this.selectors.title).textContent();
  }

  async fillCheckoutInfo(firstName, lastName, postalCode) {
    await this.page.locator(this.selectors.firstNameInput).fill(firstName);
    await this.page.locator(this.selectors.lastNameInput).fill(lastName);
    await this.page.locator(this.selectors.postalCodeInput).fill(postalCode);
    await this.page.locator(this.selectors.continueButton).click();
  }
}

class CheckoutOverviewPage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      title: '.title',
      subtotalLabel: '.summary_subtotal_label',
      finishButton: '[data-test="finish"]'
    };
  }

  async getTitle() {
    return await this.page.locator(this.selectors.title).textContent();
  }

  async getSubtotalText() {
    return await this.page.locator(this.selectors.subtotalLabel).textContent();
  }

  async completeOrder() {
    await this.page.locator(this.selectors.finishButton).click();
  }
}

class CheckoutCompletePage extends BasePage {
  constructor(page) {
    super(page);
    this.selectors = {
      title: '.title',
      completeHeader: '.complete-header'
    };
  }

  async getTitle() {
    return await this.page.locator(this.selectors.title).textContent();
  }

  async getConfirmationMessage() {
    return await this.page.locator(this.selectors.completeHeader).textContent();
  }

  async takeScreenshot(path) {
    await this.page.screenshot({ path, fullPage: true });
  }
}

module.exports = {
  LoginPage,
  InventoryPage,
  CartPage,
  CheckoutInfoPage,
  CheckoutOverviewPage,
  CheckoutCompletePage
};
