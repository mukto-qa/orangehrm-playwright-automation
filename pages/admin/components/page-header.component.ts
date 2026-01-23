import { Locator, Page } from "@playwright/test";

export class PageHeaderComponent {
  readonly title: Locator;

  constructor(page: Page) {
    this.title = page.locator(".orangehrm-main-title");
  }
}