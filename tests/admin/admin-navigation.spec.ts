import { test, expect } from "../../fixtures/pages.fixture";
import { SidebarMenu } from "../../constants/sidebar.constants";
import {
  DASHBOARD_PAGE_CONSTANTS,
  USER_LIST_PAGE_CONSTANTS,
  ADD_USER_PAGE_CONSTANTS,
} from "../../constants/ui.constants";

test.describe("TS_ADMIN_00 - Admin Navigation", () => {
  test("TC_ADMIN_NAV_01 - Verify Admin → Users → Add User navigation", {tag: "@smoke"}, async ({
    dashboardPage,
    userListPage,
    addUserPage,
  }) => {
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
        ADD_USER_PAGE_CONSTANTS.ADD_USER_FORM_HEADER,
      );
    });
  });
});
