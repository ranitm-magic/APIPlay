"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BasePage = void 0;
const selenium_webdriver_1 = require("selenium-webdriver");
class BasePage {
    constructor(driver) {
        this.timeout = 10000;
        this.driver = driver;
    }
    async click(locator) {
        try {
            const element = await this.driver.wait(selenium_webdriver_1.until.elementIsVisible(await this.driver.findElement(locator)), this.timeout);
            await element.click();
        }
        catch (error) {
            console.error(`Error clicking element: ${error}`);
            throw error;
        }
    }
    async type(locator, text) {
        try {
            const element = await this.driver.wait(selenium_webdriver_1.until.elementIsVisible(await this.driver.findElement(locator)), this.timeout);
            await element.clear();
            await element.sendKeys(text);
        }
        catch (error) {
            console.error(`Error typing text: ${error}`);
            throw error;
        }
    }
    async getText(locator) {
        try {
            const element = await this.driver.wait(selenium_webdriver_1.until.elementIsVisible(await this.driver.findElement(locator)), this.timeout);
            return await element.getText();
        }
        catch (error) {
            console.error(`Error getting text: ${error}`);
            throw error;
        }
    }
    async isElementPresent(locator) {
        try {
            await this.driver.wait(selenium_webdriver_1.until.elementLocated(locator), this.timeout);
            return true;
        }
        catch {
            return false;
        }
    }
    async waitForElementVisible(locator) {
        return await this.driver.wait(selenium_webdriver_1.until.elementIsVisible(await this.driver.findElement(locator)), this.timeout);
    }
}
exports.BasePage = BasePage;
