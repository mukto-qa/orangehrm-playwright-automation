// fixtures/auth.fixture.ts
import { test as base } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { DashboardPage } from "../pages/dashboard.page";
import { ENV } from "../config/env";

type AuthFixtures = {
  loginPage: LoginPage;
  dashboardPage: DashboardPage;
};

export const test = base.extend<AuthFixtures>({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({
      storageState: ENV.STORAGE_STATE_PATH,
    });
    const page = await context.newPage();
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    await use(new LoginPage(page));
  },

  dashboardPage: async ({ page }, use) => {
    await use(new DashboardPage(page));
  },
});

export { expect } from "@playwright/test";