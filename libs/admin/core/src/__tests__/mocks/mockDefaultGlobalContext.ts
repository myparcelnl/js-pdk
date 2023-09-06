import {vi} from 'vitest';
import {mockDefaultAppInfo, mockDefaultPlatform} from '@myparcel-pdk/admin-testing';
import {type GlobalAdminContext} from '../../types';
import {mockDefaultTranslations} from './mockDefaultTranslations';
import {mockDefaultEndpoints} from './mockDefaultEndpoints';

export const mockDefaultGlobalContext = vi.fn((): GlobalAdminContext => {
  return {
    appInfo: mockDefaultAppInfo(),
    baseUrl: '',
    bootId: '',
    endpoints: mockDefaultEndpoints(),
    eventPing: 'test1',
    eventPong: 'test2',
    language: 'en-US',
    mode: '',
    platform: mockDefaultPlatform(),
    translations: mockDefaultTranslations(),
  };
});
