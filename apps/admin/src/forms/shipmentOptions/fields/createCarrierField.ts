import {toValue} from 'vue';
import {AdminContextKey, type Plugin} from '@myparcel-dev/pdk-common';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {PackageTypeName} from '@myparcel-dev/constants';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_CARRIER, FIELD_DELIVERY_TYPE, FIELD_INSURANCE, FIELD_PACKAGE_TYPE, PROP_OPTIONS} from '../field';
import {getDeliveryTypes} from '../../helpers/getDeliveryTypes';
import {
  defineFormField,
  getInsuranceOptions,
  getPackageTypes,
  resolveFormComponent,
  setFieldProp,
  setPostNlAgeCheckSubtext,
  updateFieldsDefaults,
} from '../../helpers';
import {createAssetUrl} from '../../../utils';
import {type RadioGroupOption} from '../../../types';
import {useFetchCarrier} from '../../../sdk';
import {AdminComponent} from '../../../data';
import {useContext, useLanguage, useLocalizedFormatter} from '../../../composables';
import {createRef} from './createRef';

// eslint-disable-next-line max-lines-per-function
export const createCarrierField = (
  refs: ShipmentOptionsRefs,
  inheritedDeliveryOptions: Plugin.ModelContextOrderDataContext['inheritedDeliveryOptions'],
): InteractiveElementConfiguration => {
  const dynamicContext = useContext(AdminContextKey.Dynamic);

  const formatter = useLocalizedFormatter();

  const {translate} = useLanguage();

  return defineFormField({
    name: FIELD_CARRIER,
    label: 'carrier',
    ref: createRef<string>(refs, FIELD_CARRIER, PackageTypeName.Package),
    component: resolveFormComponent(AdminComponent.RadioGroup),
    props: {
      options: [],
    },

    onBeforeMount: async (field) => {
      const carrierSelectOptions = await Promise.all(
        dynamicContext.carriers.map(async (carrier): Promise<RadioGroupOption> => {
          const query = useFetchCarrier(carrier.name);
          await query.suspense();

          const apiCarrier = toValue(query.data);

          let plainLabel = apiCarrier?.human ?? carrier.human ?? '';

          if (!carrier.isDefault) {
            plainLabel += ` ${carrier.label ?? translate(`carrier_type_${carrier.type}`)}`;
          }

          return {
            plainLabel,
            value: carrier.externalIdentifier ?? apiCarrier?.name ?? '',
            image: apiCarrier?.meta.logo_svg ? createAssetUrl(apiCarrier.meta.logo_svg) : undefined,
          };
        }),
      );

      setFieldProp(field, PROP_OPTIONS, carrierSelectOptions);

      await field?.afterUpdate?.(field, toValue(field.ref), undefined);

      updateFieldsDefaults(toValue(field.ref) as string, field, inheritedDeliveryOptions);
    },

    afterUpdate: (field, newCarrier: string) => {
      updateFieldsDefaults(newCarrier, field, inheritedDeliveryOptions);

      setFieldProp(field.form, FIELD_INSURANCE, PROP_OPTIONS, getInsuranceOptions(field, formatter));
      setFieldProp(field.form, FIELD_PACKAGE_TYPE, PROP_OPTIONS, getPackageTypes(field.form));
      setFieldProp(field.form, FIELD_DELIVERY_TYPE, PROP_OPTIONS, getDeliveryTypes(field.form));

      setPostNlAgeCheckSubtext(field);
    },
  });
};
