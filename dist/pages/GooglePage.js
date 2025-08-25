"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GooglePage = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
const BasePage_1 = require("../base/BasePage");
class GooglePage extends BasePage_1.BasePage {
    constructor(driver) {
        super(driver);
        // Page locators
        this.searchBox = selenium_webdriver_1.By.name('q');
        this.searchButton = selenium_webdriver_1.By.name('btnK');
    }
    async navigateToGoogle() {
        await this.driver.get('https://www.google.com');
    }
    async searchFor(searchText) {
        await this.type(this.searchBox, searchText);
        try {
            await this.click(this.searchButton);
        }
        catch {
            // If button click fails, submit the form
            const searchInput = await this.driver.findElement(this.searchBox);
            await searchInput.submit();
        }
    }
    async getPageTitle() {
        return await this.driver.getTitle();
    }
}
exports.GooglePage = GooglePage;
