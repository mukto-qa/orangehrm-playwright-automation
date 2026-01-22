import { Locator, Page } from "@playwright/test";

export class HeaderComponent {
  readonly page: Page;
  readonly headerTitle: Locator;
  readonly headerBreadcrumbLevel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.headerTitle = page.locator(
      ".oxd-topbar-header-breadcrumb-module"
    );
    this.headerBreadcrumbLevel = page.locator(".oxd-topbar-header-breadcrumb-level");
  };
}
