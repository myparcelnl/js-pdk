import {updateCheckoutForm} from '../listeners';
import {useConfig} from '../config';

export const addFormListeners = (): void => {
  const config = useConfig();

  config.onFormChange(updateCheckoutForm);

  updateCheckoutForm();
};
