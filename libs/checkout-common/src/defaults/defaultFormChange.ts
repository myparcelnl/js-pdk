import {useConfig} from '../utils/useConfig';
import {type PdkCheckoutConfig} from '../types/checkout.types';

export const defaultFormChange = ((callback) => {
  const config = useConfig();
  const form = config.getForm();

  form.addEventListener('change', callback);
}) satisfies PdkCheckoutConfig['formChange'];
