import { Page } from "@playwright/test";
import { HeaderComponents } from "./components/header.component";

export class DashboardPage {
    readonly page: Page;
    readonly header: HeaderComponents;

    constructor(page: Page) {
        this.page = page;
        this.header = new HeaderComponents(page);
    }
}