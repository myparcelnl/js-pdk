import {vi} from 'vitest';
import {type GlobalAdminContext} from '../../types/context.types';

export const mockDefaultPlatform = vi.fn((): GlobalAdminContext['platform'] => {
  return {
    backofficeUrl: 'https://backoffice.test.myparcel.nl',
    defaultCarrier: 'postnl',
    defaultCarrierId: 1,
    human: 'Test',
    localCountry: 'NL',
    name: 'test',
    supportUrl: 'https://developer.myparcel.nl/contact',
  };
});
