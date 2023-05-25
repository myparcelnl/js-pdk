import type {Locator, Page} from '@playwright/test/types/test';

export abstract class CmsPageFixture {
  protected page: Page;

  public constructor(page: Page) {
    this.page = page;
  }

  public async fillIfExists(selector: string, value: string): Promise<void> {
    const element = await this.locateIfExists(selector);
    await element?.fill(value);
  }

  public async locateIfExists(selector: string): Promise<Locator | null> {
    const element = this.page.locator(selector);

    if (!(await element.isVisible())) {
      return null;
    }

    return element;
  }

  public async selectOptionIfExists(selector: string, value: string, options?: {force?: boolean}): Promise<void> {
    const element = await this.locateIfExists(selector);
    await element?.selectOption(value, options);
  }

  public async typeIfExists(selector: string, value: string): Promise<void> {
    const element = await this.locateIfExists(selector);
    await element?.type(value);
  }
}
