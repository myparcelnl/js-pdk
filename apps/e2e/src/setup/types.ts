import type {BrowserType, Page} from '@playwright/test/types/test';
import {AsAdminInterface} from '../fixtures/AsAdminInterface.ts';
import {AsGuestInterface} from '../fixtures/AsGuestInterface.ts';
import {type AsLoggedInUserInterface} from '../fixtures/AsLoggedInUserInterface.ts';
import type {PromiseOr} from '@myparcel/ts-utils';

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
