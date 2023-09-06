import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/admin-common';
import {mockDefaultShop} from './mockDefaultShop';
import {mockDefaultPrintOptionsView} from './mockDefaultPrintOptionsView';
import {mockDefaultPluginSettings} from './mockDefaultPluginSettings';
import {mockDefaultCarriers} from './mockDefaultCarriers';
import {mockDefaultAccount} from './mockDefaultAccount';

export const mockDefaultDynamicContext = vi.fn((): Plugin.ModelContextDynamicContext => {
  return {
    account: mockDefaultAccount(),
    carriers: mockDefaultCarriers(),
    pluginSettings: mockDefaultPluginSettings(),
    printOptionsView: mockDefaultPrintOptionsView(),
    shop: mockDefaultShop(),
  };
});
