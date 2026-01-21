import { ENV } from "../../config/env";
import { ROUTES } from "../../constants/routes.constants";
import { DASHBOARD_PAGE_CONSTANTS } from "../../constants/ui.constants";
import { test as setup, expect } from "../../fixtures/base.fixture";

setup("Global Auth Setup", async ({ page, loginPage, dashboardPage }) => {
  await loginPage.gotoLoginUrl();
  await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
  await page.waitForURL(`${ENV.BASE_URL}${ROUTES.DASHBOARD}`);
  await expect(dashboardPage.header.headerTitle).toHaveText(DASHBOARD_PAGE_CONSTANTS.HEADER_TEXT);

  await page.context().storageState({
    path: ".auth/admin.json",
  });
});
