import { expect, test } from "../../fixtures/base.fixture";
import { ENV } from "../../config/env";
import { DASHBOARD_PAGE_DATA, LOGIN_PAGE_DATA } from "../../constants/ui.constants";
import userData from "../../test-data/users.json"


test.describe("Login Tests", () => {

  test.beforeEach(async ({loginPage}) => {
    await test.step("Go to the login page", async () => {
      await loginPage.gotoLoginUrl();
    });
    await test.step("Verify successful navigation to the login page", async () => {
      await expect(loginPage.loginHeader).toBeVisible();
    });
  });

  test("TC_Auth_01_01 - Verify successful login with valid Admin credentials", {tag: "@smoke" }, async ({loginPage, dashboardPage}) => {
    await test.step("Submit login form with valid credentials", async () => {
      await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
    });
    await test.step("Verify redirection to Dashboard and header content", async () => {
      await expect(dashboardPage.header.headerTitle).toBeVisible();
      await expect(dashboardPage.header.headerTitle).toHaveText(DASHBOARD_PAGE_DATA.HEADER_TEXT);
    })
});

  test("TC_AUTH_01_02 - Verify login fails with invalid username", {tag: "@regression"}, async ({loginPage}) => {
    await test.step("Attempt login with non-existent username", async () => {
      await loginPage.login(userData.invalidCredentials.username, userData.invalidCredentials.password);
    });
    await test.step("Verify that the invalid credentials error message is displayed", async () => {
      await expect(loginPage.invalidCredErrorMessage).toBeVisible();
      await expect(loginPage.invalidCredErrorMessage).toHaveText(LOGIN_PAGE_DATA.ERROR_MESSAGES.INVALID_CREDENTIALS);
    });
  });

  test("TC_AUTH_01_03 - Verify login fails with invalid password", {tag: "@regression"}, async ({loginPage}) => {
    await test.step("Attempt login with valid username and incorrect password", async () => {
      await loginPage.login(ENV.USERNAME, userData.invalidCredentials.password);
    });
    await test.step("Verify that the invalid credentials error message is displayed", async () => {
      await expect(loginPage.invalidCredErrorMessage).toBeVisible();
      await expect(loginPage.invalidCredErrorMessage).toHaveText(LOGIN_PAGE_DATA.ERROR_MESSAGES.INVALID_CREDENTIALS);
    });
  });
});