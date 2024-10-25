import {useConfig} from '../utils/useConfig';
import {type PdkCheckoutConfig} from '../types/checkout.types';

export const defaultGetFormData = (() => {
  const config = useConfig();
  const form = config.getForm();

  const formData = new FormData(form);

  return Object.fromEntries(formData.entries());
}) satisfies PdkCheckoutConfig['getFormData'];
