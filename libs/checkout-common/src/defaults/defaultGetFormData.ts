import {useConfig} from '../utils';
import {type PdkCheckoutConfig} from '../types';

export const defaultGetFormData = (() => {
  const config = useConfig();
  const form = config.getForm();

  const formData = new FormData(form);

  return Object.fromEntries(formData.entries());
}) satisfies PdkCheckoutConfig['getFormData'];
