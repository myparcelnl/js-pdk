import {vi} from 'vitest';
import {type Plugin} from '@myparcel-pdk/common';

export const getDefaultPrintOptionsView = vi.fn((): Plugin.ModelContextDynamicContext['printOptionsView'] => ({
  id: 'print-options',
  children: [],
  description: 'Print options',
  elements: [],
  subtext: 'Print options',
  title: 'Print options',
}));
