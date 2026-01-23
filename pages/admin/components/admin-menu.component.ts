import { Page } from "@playwright/test";
import { AdminMenu } from "../../../domain/admin/admin-menu.enums";
import { JobMenuItem } from "../../../domain/admin/sub-menu.enums";
import { UserManagementItem } from "../../../domain/admin/user-management.enums";

export class AdminSubMenuComponent {
  constructor(private readonly page: Page) {}

  async openAdminSubMenu(menu: AdminMenu): Promise<void> {
    await this.page.getByRole("listitem").filter({ hasText: menu }).click();
  }

  async gotoUserManagementItem(
    userManagementItem: UserManagementItem,
  ): Promise<void> {
    await this.openAdminSubMenu(AdminMenu.USER_MANAGEMENT);
    await this.page.getByRole("menuitem", { name: userManagementItem }).click();
  }

  async gotoJobItem(jobItem: JobMenuItem): Promise<void> {
    await this.openAdminSubMenu(AdminMenu.JOB);
    await this.page.getByRole("menuitem", { name: jobItem }).click();
  }
}
