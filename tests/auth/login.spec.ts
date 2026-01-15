import { ENV } from "../../config/env";
import { DASHBOARD_PAGE, LOGIN_PAGE } from "../../constants/ui.constants";
import { expect, test } from "../../fixtures/base.fixture";


test("TC_Auth_01_01 - Verify successful login with valid Admin credentials", async ({loginPage, dashboardPage}) => {
    await loginPage.gotoLoginUrl();
    await expect(loginPage.loginHeader).toHaveText(LOGIN_PAGE.HEADER_TEXT);
    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    await expect(dashboardPage.header.headerTitle).toHaveText(DASHBOARD_PAGE.HEADER_TEXT);
});