import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/common';

export const mockDefaultPrintOptionsView = vi.fn((): Plugin.SettingsView => {
  return {
    id: 'print-options',
    children: [],
    description: 'Print options',
    elements: [],
    subtext: 'Print options',
    title: 'Print options',
  };
});
