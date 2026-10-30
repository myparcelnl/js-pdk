import {defineForm, type FormInstance} from '@myparcel-dev/vue-form-builder';

export const createReturnsForm = (id: string): FormInstance => {
  return defineForm(`returns${id}`, {
    fields: [],
  });
};
