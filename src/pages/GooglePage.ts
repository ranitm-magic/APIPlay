import { By, WebDriver } from 'selenium-webdriver';
import { BasePage } from '../base/BasePage';

export class GooglePage extends BasePage {
    // Page locators
    private searchBox = By.name('q');
    private searchButton = By.name('btnK');

    constructor(driver: WebDriver) {
        super(driver);
    }

    async navigateToGoogle(): Promise<void> {
        await this.driver.get('https://www.google.com');
    }

    async searchFor(searchText: string): Promise<void> {
        await this.type(this.searchBox, searchText);
        try {
            await this.click(this.searchButton);
        } catch {
            // If button click fails, submit the form
            const searchInput = await this.driver.findElement(this.searchBox);
            await searchInput.submit();
        }
    }

    async getPageTitle(): Promise<string> {
        return await this.driver.getTitle();
    }
}
