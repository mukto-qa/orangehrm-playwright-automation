import { Page } from "@playwright/test";

export class AdminSubMenuComponent {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async openUserManagementDropdown(): Promise<void> {
        await this.page.getByLabel('Topbar Menu').getByText('User Management').click();
    }

    async openJobDropdown(): Promise<void> {
        await this.page.getByLabel('Topbar Menu').getByText('User Management').click();
    }

    async openOrganizationDropdown(): Promise<void> {
        await this.page.getByText('Organization').click();
    }

    async openQualificationsDropdown(): Promise<void> {
        await this.page.getByText('Qualifications').click();
    }

    async goToNationalities(): Promise<void> {
        await this.page.getByRole('link', { name: 'Nationalities' }).click();
    }

    async goToCorporateBranding(): Promise<void> {
        await this.page.getByRole('link', { name: 'Corporate Branding' }).click();
    }

    async openConfiguration(): Promise<void> {
        await this.page.getByText('Configuration').click();
    }

    async goToUsers(): Promise<void> {
        this.openUserManagementDropdown();
        await this.page.getByRole('menuitem', { name: 'Users' }).click();
    }
}