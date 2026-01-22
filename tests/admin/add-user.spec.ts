import { SidebarMenu } from "../../constants/sidebar.constants";
import {
  ADD_USER_PAGE_CONSTANTS,
  TOAST_MESSAGES,
} from "../../constants/ui.constants";
import { test, expect } from "../../fixtures/pages.fixture";
import { generateAdminUser } from "../../utils/data-generator/adminUser.generator";

test.describe("TS_ADMIN_01 - Validate the working of Add User functionality", () => {
  test.beforeEach(async ({ dashboardPage, userListPage, addUserPage }) => {
    await test.step("Navigate to Dashboard page", async () => {
      await dashboardPage.gotoDashboardUrl();
    });

    await test.step("Navigate to Admin > User Management", async () => {
      await userListPage.sidebar.navigateTo(SidebarMenu.ADMIN);
    });

    await test.step("Navigate to Add User page", async () => {
      await userListPage.clickAddButton();
    });

    await test.step("Verify Add User page is displayed", async () => {
      await expect(addUserPage.formHeader).toBeVisible();
    });
  });

  test(
    "TC_ADMIN_01_00 - Verify Add User page loads successfully",
    { tag: "@smoke" },
    async ({ addUserPage }) => {
      await test.step("Verify Add User form header text", async () => {
        await expect(addUserPage.formHeader).toHaveText(
          ADD_USER_PAGE_CONSTANTS.ADD_USER_FORM_HEADER,
        );
      });
    },
  );

  test(
    "TC_ADMIN_01_01 - Verify successful user creation with all mandatory fields",
    { tag: "@smoke" },
    async ({ addUserPage, userListPage }) => {
      const user = generateAdminUser();

      await test.step("Fill Add User form with valid data", async () => {
        await addUserPage.fillAddUserForm({
          role: user.role,
          employeeName: user.employeeName,
          status: user.status,
          username: user.username,
          password: user.password,
        });
      });

      await test.step("Save the user", async () => {
        await addUserPage.clickSave();
      });

      await test.step("Verify success toast message", async () => {
        await expect(addUserPage.toast.toastMessage).toHaveText(
          TOAST_MESSAGES.SUCCESS_SAVE,
        );
        await addUserPage.toast.waitForToastToDisappear();
      });

      await test.step("Verify newly created user appears in user list", async () => {
        const userRow = userListPage.getUserRow(user.username);
        await expect(userRow).toBeVisible();
        await expect(userRow).toContainText(user.username);
        await expect(userRow).toContainText(user.role);
        await expect(userRow).toContainText(user.status);
      });
    },
  );
});