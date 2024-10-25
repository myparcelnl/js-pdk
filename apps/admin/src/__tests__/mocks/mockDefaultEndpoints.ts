import {vi} from 'vitest';
import {BackendEndpoint} from '@myparcel-pdk/common';
import {type GlobalAdminContext} from '../../types/context.types';

export const mockDefaultEndpoints = vi.fn((): GlobalAdminContext['endpoints'] =>
  Object.values(BackendEndpoint).reduce((acc, endpoint) => {
    return {
      ...acc,
      [endpoint]: {
        body: '',
        headers: [],
        method: '',
        parameters: [],
        path: endpoint,
        property: '',
      },
    };
  }, {} as GlobalAdminContext['endpoints']),
);
