import {AdminContextKey} from '../../../types';
import {CARRIER} from '../field';
import {Carrier} from '@myparcel-pdk/common/src';
import {FormInstance} from '@myparcel/vue-form-builder';
import {useContext} from '../../../composables';

export const getCarrierOptions = (form: FormInstance): Carrier.ModelCarrierOptions | undefined => {
  const dynamicContext = useContext(AdminContextKey.DYNAMIC);

  const chosenCarrier = form.model[CARRIER].ref.value;
  return dynamicContext.carrierOptions.find((options) => options.carrier.name === chosenCarrier);
};
