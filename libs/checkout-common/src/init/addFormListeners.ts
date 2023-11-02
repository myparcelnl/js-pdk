import {useConfig} from '../utils';
import {updateCheckoutForm} from '../listeners';

export const addFormListeners = (): void => {
  const config = useConfig();

  config.formChange(updateCheckoutForm);

  updateCheckoutForm();
};
