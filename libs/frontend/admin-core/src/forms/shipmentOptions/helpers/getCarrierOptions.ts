import {get} from '@vueuse/core';
import {Carrier} from '@myparcel-pdk/common';
import {FormInstance} from '@myparcel/vue-form-builder';
import {CARRIER} from '../field';
import {AdminContextKey} from '../../../types';
import {useContext} from '../../../composables';

export const getCarrierOptions = (form: FormInstance): Carrier.ModelCarrierOptions | undefined => {
  const dynamicContext = useContext(AdminContextKey.Dynamic);
  const chosenCarrier = get(form.model[CARRIER].ref);

  return dynamicContext.carrierOptions.find((options) => options.carrier.name === chosenCarrier);
};
