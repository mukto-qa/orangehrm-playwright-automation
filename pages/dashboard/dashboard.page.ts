import { Page } from "@playwright/test";
import { HeaderComponent } from "../components/header.component";
import { ENV } from "../../config/env";
import { ROUTES } from "../../constants/routes.constants";
import { SidebarComponent } from "../components/sidebar.components";

export class DashboardPage {
    readonly page: Page;
    readonly header: HeaderComponent;
    readonly sidebar: SidebarComponent;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponent(page);
        this.sidebar = new SidebarComponent(page);
    }

    async gotoDashboardUrl(): Promise<void> {
        await this.page.goto(`${ENV.BASE_URL}${ROUTES.DASHBOARD}`);
        await this.page.waitForURL(`${ENV.BASE_URL}${ROUTES.DASHBOARD}`);
        await this.page.waitForLoadState('domcontentloaded');
    }
}