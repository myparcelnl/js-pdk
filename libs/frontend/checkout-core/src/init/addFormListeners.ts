import {updateCheckoutForm} from '../listeners';
import {useConfig} from '../config';

export const addFormListeners = (): void => {
  const config = useConfig();
  const form = config.getForm();

  updateCheckoutForm({currentTarget: form} as unknown as Event);

  form?.addEventListener('change', updateCheckoutForm);
};
