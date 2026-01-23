import { Locator, Page } from "@playwright/test";
import { HeaderComponent } from "../../components/header.component";
import { SidebarComponent } from "../../components/sidebar.components";
import { AdminSubMenuComponent } from "../components/admin.submenu.component";

export class UserListPage {
  readonly page: Page;
  readonly header: HeaderComponent;
  readonly sidebar: SidebarComponent;
  readonly adminSubMenu: AdminSubMenuComponent;
  readonly addButton: Locator;
  readonly usersTable: Locator;
  readonly tableBody: Locator;
  constructor(page: Page) {
    this.page = page;
    this.header = new HeaderComponent(page);
    this.sidebar = new SidebarComponent(page);
    this.adminSubMenu = new AdminSubMenuComponent(page);
    this.addButton = page.getByRole("button", { name: " Add" });
    this.usersTable = page.locator(".oxd-table");
    this.tableBody = page.locator(".oxd-table-body");
  }

  async clickAddButton(): Promise<void> {
    await this.addButton.click();
  }

  getUserRow(username: string): Locator {
    return this.tableBody.locator(".oxd-table-row", {
      has: this.page.getByText(username),
    });
  }
}
