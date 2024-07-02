import {useConfig} from '../utils';
import {type PdkCheckoutConfig} from '../types';

export const defaultFormChange = ((callback) => {
  const config = useConfig();
  const form = config.getForm();

  form.addEventListener('change', callback);
}) satisfies PdkCheckoutConfig['formChange'];
