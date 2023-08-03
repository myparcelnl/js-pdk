import {vi} from 'vitest';
import {type GlobalAdminContext} from '@myparcel-pdk/frontend-admin-core';
import {getDefaultTranslations} from './getDefaultTranslations';
import {getDefaultPluginSettings} from './getDefaultPluginSettings';
import {getDefaultPlatform} from './getDefaultPlatform';
import {getDefaultEndpoints} from './getDefaultEndpoints';
import {getDefaultAppInfo} from './getDefaultAppInfo';

export const getDefaultGlobalContext = vi.fn(
  (): GlobalAdminContext =>
    ({
      appInfo: getDefaultAppInfo(),
      baseUrl: '',
      bootId: '',
      endpoints: getDefaultEndpoints(),
      eventPing: 'test1',
      eventPong: 'test2',
      language: 'en-US',
      mode: '',
      platform: getDefaultPlatform(),
      pluginSettings: getDefaultPluginSettings(),
      translations: getDefaultTranslations(),
    } as GlobalAdminContext),
);
