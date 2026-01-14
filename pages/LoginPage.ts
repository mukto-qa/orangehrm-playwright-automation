import { Locator, Page } from "@playwright/test";


export class LoginPage {
    readonly page:Page
    readonly usernameInputField: Locator;
    readonly passwordInputField: Locator;
    readonly loginButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.usernameInputField = page.getByRole('textbox', { name: 'Username' });
        this.passwordInputField = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }

    /**
     * Navigates to the login page and waits for the form to be visible.
     */
    async nagivateToLoginPage(): Promise<void> {
        await this.page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");
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