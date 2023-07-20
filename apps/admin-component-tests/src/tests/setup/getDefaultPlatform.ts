import {vi} from 'vitest';

export const getDefaultPlatform = vi.fn(() => ({
  backofficeUrl: 'https://backoffice.test.myparcel.nl',
  defaultCarrier: 'postnl',
  defaultCarrierId: 1,
  human: 'Test',
  localCountry: 'NL',
  name: 'test',
}));
