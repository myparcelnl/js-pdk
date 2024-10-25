import {useConfig} from '../utils/useConfig';
import {updateCheckoutForm} from '../listeners/updateCheckoutForm';

export const addFormListeners = (): void => {
  const config = useConfig();

  config.formChange(updateCheckoutForm);

  updateCheckoutForm();
};
