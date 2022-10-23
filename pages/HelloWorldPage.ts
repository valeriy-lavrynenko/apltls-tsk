import {Locator, Page } from '@playwright/test';

export class HelloWorldPage {
    clickMeButtonLocator: Locator;
    randomNumberRegionLocator: Locator;

    constructor(protected page: Page) {
        this.clickMeButtonLocator = page.locator('.button-section button');
        this.randomNumberRegionLocator = page.locator('p:has(.random-number)');
    }
}