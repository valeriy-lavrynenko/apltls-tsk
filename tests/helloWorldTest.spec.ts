import { test, expect } from '@playwright/test';
import {BatchInfo, ClassicRunner, Configuration, Eyes, Target} from "@applitools/eyes-playwright";
import {HelloWorldPage} from "../pages/HelloWorldPage";

export let Runner: ClassicRunner;
export let Batch: BatchInfo;
export let Config: Configuration;

test.beforeAll(async() => {
    Runner = new ClassicRunner();
    Batch = new BatchInfo({name: 'Applitools assignment'});
    Config = new Configuration();
    Config.setBatch(Batch);
})

test.describe('Applitools assignment', () => {
  let eyes: Eyes;

  test.beforeEach(async ({ page }) => {
    eyes = new Eyes(Runner, Config);

    await eyes.open(
        page,
        'Applitools assignment demo',
        test.info().title,
        { width: 1024, height: 768 }
    );
  });

  test('Check hello world page', async ({ page }) => {
    const helloWorldPage = new HelloWorldPage(page);

    await page.goto('/helloworld/?diff1');

    await eyes.check('Hello world page', Target.window()
        .ignoreRegion(helloWorldPage.randomNumberRegionLocator).variationGroupId('just opened'));

    await helloWorldPage.clickMeButtonLocator.click();

    await eyes.check('Hello world page', Target.window()
        .ignoreRegion(helloWorldPage.randomNumberRegionLocator).variationGroupId('button clicked'));
  });

  test.afterEach(async () => {
    await eyes.close();
  });
});

test.afterAll(async() => {
  const results = await Runner.getAllTestResults();
  console.log('Visual test results', results);
});
