import { Locator, Page } from "@playwright/test";
import { ENV } from "../config/env";
import { ROUTES } from "../constants/routes.constants";


export class LoginPage {
    readonly page:Page
    readonly loginHeader: Locator;
    readonly usernameInputField: Locator;
    readonly passwordInputField: Locator;
    readonly loginButton: Locator;
    readonly invalidCredErrorMessage: Locator;
    readonly usernameRequiredError: Locator;
    readonly passwordRequiredError: Locator;

    constructor(page: Page) {
        this.page = page;
        this.loginHeader = page.getByRole('heading', { name: 'Login' });
        this.usernameInputField = page.getByRole('textbox', { name: 'Username' });
        this.passwordInputField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.invalidCredErrorMessage = page.getByText('Invalid credentials');
        this.usernameRequiredError = this.usernameInputField.locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]').locator('.oxd-input-field-error-message');
        this.passwordRequiredError = this.passwordInputField.locator('xpath=ancestor::div[contains(@class,"oxd-input-group")]').locator('.oxd-input-field-error-message');
    }

    /**
     * Navigates to the login page and waits for the form to be visible.
     */
    async gotoLoginUrl(): Promise<void> {
        await this.page.goto(`${ENV.BASE_URL}${ROUTES.LOGIN}`);
    }

    /**
     * Performs a full login flow.
     * @param username
     * @param password
     */
    async login(username: string, password: string): Promise<void> {
        await this.usernameInputField.fill(username);
        await this.passwordInputField.fill(password);
        await this.loginButton.click();
    }
}