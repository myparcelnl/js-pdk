import {vi} from 'vitest';
import {type GlobalAdminContext} from '@myparcel-pdk/frontend-admin-core';
import {BackendEndpoint} from '@myparcel-pdk/common';

export const getDefaultEndpoints = vi.fn(() =>
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
