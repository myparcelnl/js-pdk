import {type Carrier} from '@myparcel-pdk/common';
import {type FormInstance} from '@myparcel/vue-form-builder';
import {FIELD_CARRIER} from '../shipmentOptions';
import {AdminContextKey} from '../../data';
import {useContext} from '../../composables';

export const getCarrier = (form: FormInstance): Carrier.ModelCarrier | undefined => {
  const dynamicContext = useContext(AdminContextKey.Dynamic);
  const chosenCarrier = form.getValue(FIELD_CARRIER);

  return dynamicContext.carriers.find((carrier) => carrier.externalIdentifier === chosenCarrier);
};
