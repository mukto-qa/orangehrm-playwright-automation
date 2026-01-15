import { expect, test } from "../../fixtures/base.fixture";
import { ENV } from "../../config/env";
import { DASHBOARD_PAGE, LOGIN_PAGE } from "../../constants/ui.constants";
import userData from "../../test-data/users.json"


test.describe("Login Tests", () => {

  test.beforeEach(async ({loginPage}) => {
    await loginPage.gotoLoginUrl();
    await expect(loginPage.loginHeader).toHaveText(LOGIN_PAGE.HEADER_TEXT);
  })

  test("TC_Auth_01_01 - Verify successful login with valid Admin credentials", {tag: "@smoke" }, async ({loginPage, dashboardPage}) => {
    await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    await expect(dashboardPage.header.headerTitle).toHaveText(DASHBOARD_PAGE.HEADER_TEXT);
});

  test("TC_AUTH_01_02 - Verify login fails with invalid username", {tag: "@regression"}, async ({loginPage}) => {
    await loginPage.login(userData.invalidCredentials.username, userData.invalidCredentials.password);
    await expect(loginPage.invalidCredErrorMessage).toHaveText(LOGIN_PAGE.ERROR_MESSAGES.INVALID_CREDENTIALS);
  })
})