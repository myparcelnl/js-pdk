import {vi} from 'vitest';
import {type GlobalAdminContext} from '../../types';

export const mockDefaultProposition = vi.fn((): GlobalAdminContext['proposition'] => {
  return {
    backofficeUrl: 'https://backoffice.test.myparcel.nl',
    human: 'Test',
    localCountry: 'NL',
    name: 'test',
    supportUrl: 'https://developer.myparcel.nl/contact',
  };
});
