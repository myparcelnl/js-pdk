import {defineForm} from '@myparcel/vue-form-builder';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createReturnsForm = (id: string) => {
  return defineForm(`returns${id}`, {
    fields: [],
  });
};
