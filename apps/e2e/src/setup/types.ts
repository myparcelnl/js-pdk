import {type BrowserType, type Page} from '@playwright/test/types/test';
import {type PromiseOr} from '@myparcel/ts-utils';
import {type AsLoggedInUserInterface} from '../fixtures/AsLoggedInUserInterface.ts';
import {AsGuestInterface} from '../fixtures/AsGuestInterface.ts';
import {AsAdminInterface} from '../fixtures/AsAdminInterface.ts';

export type LoginCallback = (page: Page) => PromiseOr<void>;

export type ExtendedCmsFixtures = {
  asAdmin: AsAdminInterface;
  asGuest: AsGuestInterface;
  asLoggedInUser: AsLoggedInUserInterface;
};

type Newable<T> = new (...args: unknown[]) => T;

export type Config = {
  asAdmin: () => Newable<AsAdminInterface>;
  asGuest: () => Newable<AsGuestInterface>;
  asLoggedInUser: () => Newable<AsLoggedInUserInterface>;
  credentialsFileAdmin?: string;
  credentialsFileUser?: string;
  loginAsAdmin: LoginCallback;
  loginAsUser: LoginCallback;
  loginBrowser: BrowserType;
};

export type ResolvedConfig = Required<Config>;
