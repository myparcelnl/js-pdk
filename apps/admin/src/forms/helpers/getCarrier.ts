import {AdminContextKey, type Carrier} from '@myparcel-dev/pdk-common';
import {type FormInstance} from '@myparcel-dev/vue-form-builder';
import {FIELD_CARRIER} from '../shipmentOptions';
import {useContext} from '../../composables';

export const getCarrier = (form: FormInstance): Carrier.ModelCarrier | undefined => {
  const dynamicContext = useContext(AdminContextKey.Dynamic);
  const chosenCarrier = form.getValue(FIELD_CARRIER);

  return dynamicContext.carriers.find((carrier) => carrier.externalIdentifier === chosenCarrier);
};
