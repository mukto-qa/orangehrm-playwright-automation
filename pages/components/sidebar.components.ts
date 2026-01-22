import { Page } from "@playwright/test";
import { SidebarMenu } from "../../constants/sidebar.constants";

export class SidebarComponent {
  readonly page: Page;
  constructor(page: Page) {
    this.page = page;
  }

  async navigateTo(menu: SidebarMenu): Promise<void> {
    const menuItem = this.page.getByRole("link", { name: menu });
    await menuItem.waitFor({ state: "visible" });
    await menuItem.click();
  }
}
