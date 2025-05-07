const { test, expect } = require('@playwright/test');

test.describe('GuessWars Game UI', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080');
    });

    test('game loads correctly', async ({ page }) => {
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('#guessInput')).toBeVisible();
        await expect(page.locator('#submitButton')).toBeVisible();
    });

    test('submit guess interaction', async ({ page }) => {
        const guessInput = await page.locator('#guessInput');
        const submitButton = await page.locator('#submitButton');

        await guessInput.fill('Luke Skywalker');
        await submitButton.click();

        // Check for result modal or score update
        const resultModal = await page.locator('#resultModal');
        await expect(resultModal).toBeVisible();
    });

    test('help modal functionality', async ({ page }) => {
        const helpButton = await page.locator('#helpButton');
        await helpButton.click();

        const helpModal = await page.locator('#helpModal');
        await expect(helpModal).toBeVisible();
    });
});
