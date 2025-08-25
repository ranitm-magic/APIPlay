import { WebDriver, WebElement, By, until } from 'selenium-webdriver';

export class BasePage {
    protected driver: WebDriver;
    protected timeout: number = 10000;

    constructor(driver: WebDriver) {
        this.driver = driver;
    }

    protected async click(locator: By): Promise<void> {
        try {
            const element = await this.driver.wait(until.elementIsVisible(
                await this.driver.findElement(locator)
            ), this.timeout);
            await element.click();
        } catch (error) {
            console.error(`Error clicking element: ${error}`);
            throw error;
        }
    }

    protected async type(locator: By, text: string): Promise<void> {
        try {
            const element = await this.driver.wait(until.elementIsVisible(
                await this.driver.findElement(locator)
            ), this.timeout);
            await element.clear();
            await element.sendKeys(text);
        } catch (error) {
            console.error(`Error typing text: ${error}`);
            throw error;
        }
    }

    protected async getText(locator: By): Promise<string> {
        try {
            const element = await this.driver.wait(until.elementIsVisible(
                await this.driver.findElement(locator)
            ), this.timeout);
            return await element.getText();
        } catch (error) {
            console.error(`Error getting text: ${error}`);
            throw error;
        }
    }

    protected async isElementPresent(locator: By): Promise<boolean> {
        try {
            await this.driver.wait(until.elementLocated(locator), this.timeout);
            return true;
        } catch {
            return false;
        }
    }

    protected async waitForElementVisible(locator: By): Promise<WebElement> {
        return await this.driver.wait(until.elementIsVisible(
            await this.driver.findElement(locator)
        ), this.timeout);
    }
}
