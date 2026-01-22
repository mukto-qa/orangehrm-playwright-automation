import { Locator, Page } from "@playwright/test";
import { ToastComponent } from "../../components/toast.component";

export class AddUserPage {
  readonly page: Page;
  readonly toast: ToastComponent 

  // Header
  readonly formHeader: Locator;

  // Dropdowns
  readonly userRoleDropdown: Locator;
  readonly statusDropdown: Locator;

  // Inputs
  readonly employeeNameInput: Locator;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;

  // Buttons
  readonly saveButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.toast = new ToastComponent(page);

    // Header
    this.formHeader = page.getByRole("heading", { name: "Add User" });

    // Dropdowns
    this.userRoleDropdown = page
      .locator(".oxd-input-group", { hasText: "User Role" })
      .locator(".oxd-select-wrapper");

    this.statusDropdown = page
      .locator(".oxd-input-group", { hasText: "Status" })
      .locator(".oxd-select-wrapper");

    // Inputs
    this.employeeNameInput = page.getByRole("textbox", {
      name: "Type for hints...",
    });
    this.usernameInput = page.locator(
      "div[class='oxd-form-row'] div[class='oxd-grid-2 orangehrm-full-width-grid'] div[class='oxd-grid-item oxd-grid-item--gutters'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[class='oxd-input oxd-input--active']",
    );
    this.passwordInput = page.locator(
      "div[class='oxd-grid-item oxd-grid-item--gutters user-password-cell'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[type='password']",
    );
    this.confirmPasswordInput = page.locator(
      "div[class='oxd-grid-item oxd-grid-item--gutters'] div[class='oxd-input-group oxd-input-field-bottom-space'] div input[type='password']",
    );

    // Buttons
    this.saveButton = page.getByRole("button", { name: "Save" });
    this.cancelButton = page.getByRole("button", { name: "Cancel" });
  }

  // ---------- Actions ----------

  private async selectDropdownOption(option: string): Promise<void> {
    await this.page.getByRole("option", { name: option }).click();
  }

  async selectUserRole(role: string): Promise<void> {
    await this.userRoleDropdown.click();
    await this.selectDropdownOption(role);
  }

  async selectStatus(status: string): Promise<void> {
    await this.statusDropdown.click();
    await this.selectDropdownOption(status);
  }

  async fillEmployeeName(name: string): Promise<void> {
    await this.employeeNameInput.click();
    await this.employeeNameInput.pressSequentially(name, { delay: 1500 });
    const firstResult = this.page.locator(".oxd-autocomplete-option").first();
    await firstResult.waitFor({ state: "visible" });
    await firstResult.click();
  }

  async fillUsername(username: string): Promise<void> {
    await this.usernameInput.fill(username);
  }

  async fillPassword(password: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(password);
  }

  async clickSave(): Promise<void> {
    await this.saveButton.click();
  }

  // ---------- High-level Action ----------

  async fillAddUserForm(data: {
    role: string;
    employeeName: string;
    status: string;
    username: string;
    password: string;
  }): Promise<void> {
    await this.selectUserRole(data.role);
    await this.fillEmployeeName(data.employeeName);
    await this.selectStatus(data.status);
    await this.fillUsername(data.username);
    await this.fillPassword(data.password);
  }
}
