import {vi} from 'vitest';
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
  }, {} as AdminContext['endpoints']),
);
