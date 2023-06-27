import {type Carrier} from '@myparcel-pdk/common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {CARRIER} from '../field';
import {AdminContextKey} from '../../../types';
import {useContext} from '../../../composables';

export const getCarrier = (form: FormInstance): Carrier.ModelCarrier | undefined => {
  const dynamicContext = useContext(AdminContextKey.Dynamic);
  const chosenCarrier = form.getValue(CARRIER);

  return dynamicContext.carriers.find((carrier) => carrier.externalIdentifier === chosenCarrier);
};
