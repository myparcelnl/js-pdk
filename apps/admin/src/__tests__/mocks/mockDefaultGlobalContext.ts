import {vi} from 'vitest';
import {type GlobalAdminContext} from '../../types';
import {mockDefaultTranslations} from './mockDefaultTranslations';
import {mockDefaultProposition} from './mockDefaultProposition';
import {mockDefaultEndpoints} from './mockDefaultEndpoints';
import {mockDefaultAppInfo} from './mockDefaultAppInfo';

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
    proposition: mockDefaultProposition(),
    translations: mockDefaultTranslations(),
  };
});
