import { Page } from "@playwright/test";
import { AdminMenu } from "../../../domain/admin/admin-menu.enums";
import { JobMenuItem } from "../../../domain/admin/job.enums";

export class AdminSubMenuComponent {
  constructor(private readonly page: Page) {}

  async openAdminSubMenu(menu: AdminMenu): Promise<void> {
    await this.page.getByRole("listitem", { name: menu }).click();
  }

  async gotoJobItem(jobItem: JobMenuItem): Promise<void> {
    await this.openAdminSubMenu(AdminMenu.JOB);
    await this.page.getByRole("menuitem", { name: jobItem }).click();
  }
}