import { test, expect } from "../../fixtures/pages.fixture";
import { SidebarMenu } from "../../domain/navigation/sidebar-menu.enums";
import { DASHBOARD_PAGE_CONSTANTS } from "../../constants/pages/dashboard.page.constants";
import { USER_LIST_PAGE_CONSTANTS } from "../../constants/pages/user-list.page.constants";
import { ADD_USER_PAGE_CONSTANTS } from "../../constants/pages/add-user.page.constants";

test.describe("TS_ADMIN_00 - Admin Navigation", () => {
  test(
    "TC_ADMIN_NAV_01 - Verify Admin → Users → Add User navigation",
    { tag: "@smoke" },
    async ({ dashboardPage, userListPage, addUserPage }) => {
      await test.step("Navigate to Dashboard as logged-in user", async () => {
        await dashboardPage.gotoDashboardUrl();
      });

      await test.step("Verify Dashboard page is loaded", async () => {
        await expect(dashboardPage.header.headerTitle).toBeVisible();
        await expect(dashboardPage.header.headerTitle).toHaveText(
          DASHBOARD_PAGE_CONSTANTS.HEADER_TEXT,
        );
      });

      await test.step("Navigate to Admin module from sidebar", async () => {
        await userListPage.sidebar.navigateTo(SidebarMenu.ADMIN);
      });

      await test.step("Verify User List page is displayed", async () => {
        await expect(userListPage.header.headerBreadcrumbLevel).toHaveText(
          USER_LIST_PAGE_CONSTANTS.HEADER_TEXT,
        );
      });

      await test.step("Navigate to Add User page", async () => {
        await userListPage.clickAddButton();
      });

      await test.step("Verify Add User page is displayed", async () => {
        await expect(addUserPage.formHeader).toHaveText(
          ADD_USER_PAGE_CONSTANTS.FORM_HEADER,
        );
      });
    },
  );

  test("Check sub menu navigation", async ({
    dashboardPage,
    userListPage,
    addUserPage,
  }) => {
    await dashboardPage.gotoDashboardUrl();
    await userListPage.sidebar.navigateTo(SidebarMenu.ADMIN);
    // await userListPage.adminSubMenu.openAdminSubMenu(A);
  });
});
