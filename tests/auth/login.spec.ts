import { test, expect } from "../../fixtures/base.fixture";
import { ENV } from "../../config/env";
import {
  DASHBOARD_PAGE_CONSTANTS,
  LOGIN_PAGE_CONSTANTS,
} from "../../constants/ui.constants";
import loginData from "../../test-data/login-data.json";

type InvalidLoginScenario = {
  title: string;
  username: string;
  password: string;
  tag: string;
  checkNoSystemError?: boolean; 
};

const invalidLoginScenarios: InvalidLoginScenario[] = [
  {
    title: "TC_AUTH_01_02 - Verify login fails with invalid username",
    username: loginData.invalidCredentials.username,
    password: ENV.PASSWORD,
    tag: "@regression",
  },
  {
    title: "TC_AUTH_01_03 - Verify login fails with invalid password",
    username: ENV.USERNAME,
    password: loginData.invalidCredentials.password,
    tag: "@regression",
  },
  {
    title: "TC_AUTH_01_04 - Verify login fails with both invalid credentials",
    username: loginData.invalidCredentials.username,
    password: loginData.invalidCredentials.password,
    tag: "@regression",
  },
  {
    title: "TC_AUTH_01_12 - Verify case sensitivity of password",
    username: ENV.USERNAME,
    password: ENV.PASSWORD.toUpperCase(),
    tag: "@regression",
  },
  {
    title: "TC_AUTH_01_13 - Verify SQL injection in username",
    username: loginData.sqlInjectionData.username,
    password: ENV.PASSWORD,
    tag: "@Critical_Path",
    checkNoSystemError: true,
  },
];

type EmptyFieldScenario = {
  title: string;
  username: string;
  password: string;
  expected: {
    usernameError: boolean;
    passwordError: boolean;
  };
  tag: string;
};

const emptyFieldScenarios: EmptyFieldScenario[] = [
  {
    title: "TC_AUTH_01_05 - Verify login fails with empty username field",
    username: "",
    password: ENV.PASSWORD,
    expected: {
      usernameError: true,
      passwordError: false,
    },
    tag: "@regression",
  },
  {
    title: "TC_AUTH_01_06 - Verify login fails with empty password field",
    username: ENV.USERNAME,
    password: "",
    expected: {
      usernameError: false,
      passwordError: true,
    },
    tag: "@regression",
  },
  {
    title: "TC_AUTH_01_07 - Verify login fails with both fields empty",
    username: "",
    password: "",
    expected: {
      usernameError: true,
      passwordError: true,
    },
    tag: "@regression",
  },
];

test.describe("TS_AUTH_01 - Validate the working of Login functionality", () => {
  test.beforeEach(async ({ loginPage }) => {
    await test.step("Go to the login page", async () => {
      await loginPage.gotoLoginUrl();
    });
    await test.step("Verify successful navigation to the login page", async () => {
      await expect(loginPage.loginHeader).toBeVisible();
    });
  });

  test(
    "TC_Auth_01_01 - Verify successful login with valid Admin credentials",
    { tag: "@smoke" },
    async ({ loginPage, dashboardPage }) => {
      await test.step("Submit login form with valid credentials", async () => {
        await loginPage.login(ENV.USERNAME, ENV.PASSWORD);
      });
      await test.step("Verify redirection to Dashboard and header content", async () => {
        await expect(dashboardPage.header.headerTitle).toBeVisible();
        await expect(dashboardPage.header.headerTitle).toHaveText(DASHBOARD_PAGE_CONSTANTS.HEADER_TEXT);
      });
    },
  );

  for (const scenario of invalidLoginScenarios) {
    test(scenario.title, { tag: scenario.tag }, async ({ loginPage }) => {
      await test.step("Attempt login with scenario data", async () => {
        await loginPage.login(scenario.username, scenario.password);
      });

      await test.step("Verify login fails with Invalid credentials error", async () => {
        await expect(loginPage.invalidCredErrorMessage).toBeVisible();
        await expect(loginPage.invalidCredErrorMessage).toHaveText(
          LOGIN_PAGE_CONSTANTS.ERROR_MESSAGES.INVALID_CREDENTIALS,
        );
        await expect(loginPage.loginHeader).toBeVisible();
      });

      if (scenario.checkNoSystemError) {
        await test.step("Verify no SQL/system errors are exposed", async () => {
          const sqlError = await loginPage.page.locator("text=SQL").count();
          const exceptionError = await loginPage.page.locator("text=exception").count();
          const syntaxError = await loginPage.page.locator("text=syntax").count();

          expect(sqlError).toBe(0);
          expect(exceptionError).toBe(0);
          expect(syntaxError).toBe(0);
        });
      }
    });
  }

  for (const scenario of emptyFieldScenarios) {
    test(scenario.title, { tag: scenario.tag }, async ({ loginPage }) => {
      await test.step("Attempt login with empty field combination", async () => {
        await loginPage.login(scenario.username, scenario.password);
      });

      await test.step("Verify required field validation messages", async () => {
        scenario.expected.usernameError
          ? await expect(loginPage.usernameRequiredError).toBeVisible()
          : await expect(loginPage.usernameRequiredError).toBeHidden();

        scenario.expected.passwordError
          ? await expect(loginPage.passwordRequiredError).toBeVisible()
          : await expect(loginPage.passwordRequiredError).toBeHidden();
      });
    });
  }
});