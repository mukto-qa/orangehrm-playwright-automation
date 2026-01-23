import { ENV } from "../../config/env";
import { DASHBOARD_PAGE_CONSTANTS } from "../../constants/pages/dashboard.page.constants";
import { ROUTES } from "../../constants/routes.constants";
import { test as setup, expect } from "../../fixtures/pages.fixture";

const authFilePath = ".auth/admin.json";

setup("Global Auth Setup", async ({ page, loginPage, dashboardPage }) => {
  await loginPage.gotoLoginUrl();
  await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
  await page.waitForURL(`${ENV.BASE_URL}${ROUTES.DASHBOARD}`);
  await expect(dashboardPage.header.headerTitle).toHaveText(
    DASHBOARD_PAGE_CONSTANTS.HEADER_TEXT,
  );

  await page.context().storageState({
    path: authFilePath,
  });
});
