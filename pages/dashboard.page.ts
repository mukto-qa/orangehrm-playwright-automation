import { Page } from "@playwright/test";
import { HeaderComponents } from "./components/header.component";
import { ENV } from "../config/env";
import { ROUTES } from "../constants/routes.constants";

export class DashboardPage {
    readonly page: Page;
    readonly headerComponents: HeaderComponents;

    constructor(page: Page) {
        this.page = page;
        this.headerComponents = new HeaderComponents(page);
    }

    async gotoDashboardUrl(): Promise<void> {
        this.page.goto(`${ENV.BASE_URL}${ROUTES.DASHBOARD}`);
    }
}