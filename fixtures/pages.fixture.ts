import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard/dashboard.page";
import { UserListPage } from "../pages/admin/users/user-list.page";
import { AddUserPage } from "../pages/admin/users/add-user.page";

type PagesFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
  userListPage: UserListPage;
  addUserPage: AddUserPage;
};

export const test = base.extend<PagesFixtures>({
  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },

  userListPage: async ({page}, use) => {
    await use(new UserListPage(page));
  },

  addUserPage: async ({page}, use) => {
    await use(new AddUserPage(page));
  }
});

export { expect } from "@playwright/test";