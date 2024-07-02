import {getFormDataSpy} from './spies';

export const mockShippingMethod = (shippingMethod: string): void => {
  getFormDataSpy.mockReturnValue({
    ...getFormDataSpy(),
    'shipping-method': shippingMethod,
  });
};
