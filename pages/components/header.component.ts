import { Locator, Page } from "@playwright/test";

export class HeaderComponents {
  readonly page: Page;
  readonly headerTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator(
      ".oxd-topbar-header-breadcrumb-module"
    );
  };
}
