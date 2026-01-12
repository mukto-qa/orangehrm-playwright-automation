import { test } from "../fixtures/pom-fixtures";


test("Valid login", async({page, loginPage}) => {
    await loginPage.nagivateToLoginPage();
    await loginPage.login("Admin", "admin123");
});