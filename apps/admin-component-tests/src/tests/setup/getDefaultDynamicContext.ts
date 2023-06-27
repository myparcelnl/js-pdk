import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/common';
import {getDefaultShop} from './getDefaultShop';
import {getDefaultPrintOptionsView} from './getDefaultPrintOptionsView';
import {getDefaultPluginSettings} from './getDefaultPluginSettings';
import {getDefaultCarriers} from './getDefaultCarriers';
import {getDefaultAccount} from './getDefaultAccount';

export const getDefaultDynamicContext = vi.fn(
  (): Plugin.ModelContextDynamicContext => ({
    account: getDefaultAccount(),
    carriers: getDefaultCarriers(),
    pluginSettings: getDefaultPluginSettings(),
    printOptionsView: getDefaultPrintOptionsView(),
    shop: getDefaultShop(),
  }),
);
