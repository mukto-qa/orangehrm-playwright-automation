import { ENV } from "../../config/env";
import { test as setup, expect } from "../../fixtures/base.fixture";

setup("Global Auth Setup", async ({ page, loginPage, dashboardPage }) => {
  await loginPage.gotoLoginUrl();
  await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
  await expect(dashboardPage.header.headerTitle).toHaveText("Dashboard");

  await page.context().storageState({
    path: ENV.STORAGE_STATE_PATH,
  });
});
