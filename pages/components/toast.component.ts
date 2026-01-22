import { Locator, Page } from "@playwright/test";

export class ToastComponent {
  readonly page: Page;
  readonly toastMessage: Locator;
  constructor(page: Page) {
    this.page = page;
    this.toastMessage = page.locator(".oxd-text--toast-message");
  }

  async waitForToastToDisappear(): Promise<void> {
    await this.toastMessage.waitFor({ state: "hidden" });
  }
}
