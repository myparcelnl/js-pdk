// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
import {defineForm} from '@myparcel/vue-form-builder';

export const createReturnsForm = (id: string) => {
  return defineForm(`returns${id}`, {
    fields: [],
  });
};
