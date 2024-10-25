import {useDeliveryOptionsStore} from '../utils/useDeliveryOptionsStore';
import {createHiddenInput} from './createHiddenInput';

/**
 * Create an input field in the checkout form to be able to pass the checkout data to the $_POST variable when
 * placing the order.
 */
export const initializeHiddenInput = (): void => {
  const hiddenInput = createHiddenInput();
  const deliveryOptions = useDeliveryOptionsStore();

  void deliveryOptions.set({hiddenInput});
};
