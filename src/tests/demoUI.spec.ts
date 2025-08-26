import { test, expect } from '@playwright/test';

test.describe('Google Search UI Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to Google homepage
    await page.goto('https://www.google.com');
    
    // Handle cookie consent if it appears
    try {
      await page.waitForSelector('button:has-text("Accept all")', { timeout: 3000 });
      await page.click('button:has-text("Accept all")');
    } catch (error) {
      // Cookie consent not found or already accepted
      console.log('Cookie consent not found or already handled');
    }
  });

  test('should load Google homepage', async ({ page }) => {
    // Verify page title
    await expect(page).toHaveTitle(/Google/);
    
    // Verify search input is visible
    const searchInput = page.locator('textarea[name="q1"]');
    await expect(searchInput).toBeVisible();


    await searchInput.fill('Playwright Testing');
    await searchInput.press('Enter');
    
    



  });


});