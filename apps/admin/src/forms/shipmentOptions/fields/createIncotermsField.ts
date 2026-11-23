import {watch} from 'vue';
import {type InteractiveElementConfiguration} from '@myparcel-dev/vue-form-builder';
import {TriState} from '@myparcel-dev/pdk-common';
import {type ShipmentOptionsRefs} from '../types';
import {FIELD_INCOTERMS, PROP_OPTIONS} from '../field';
import {defineFormField, getFieldLabel, resolveFormComponent, setFieldProp, useFormCapabilities} from '../../helpers';
import {setFieldRef} from '../../form-builder/utils/createValueSetter';
import {type ElementInstance} from '../../../types';
import {AdminComponent} from '../../../data';
import {createRef} from './createRef';

/**
 * Create the select for the Incoterms rule of the shipment.
 *
 * - The options come from getIncotermsOptions(). The capabilities return the rules outside
 *   `carrier.options`, so this field is added on its own and not per carrier option.
 * - No options: the field is hidden and not sent, so the shipment goes without a rule.
 * - One rule: the field gets that rule as value, because the select has no "Default" option then.
 * - A chosen rule that is no longer allowed is reset by useCapabilitiesAutoClear.
 */
export const createIncotermsField = (refs: ShipmentOptionsRefs): InteractiveElementConfiguration => {
  const capabilities = useFormCapabilities();
  let stopWatcher: (() => void) | undefined;

  return defineFormField({
    name: FIELD_INCOTERMS,
    label: getFieldLabel('incoterms'),
    ref: createRef(refs, FIELD_INCOTERMS, TriState.Inherit),
    component: resolveFormComponent(AdminComponent.SelectInput),
    visibleWhen: ({form}) => capabilities.getIncotermsOptions(form).length > 0,
    disabledWhen: ({form}) => capabilities.getIncotermsOptions(form).length === 0,
    onBeforeMount(field: ElementInstance) {
      stopWatcher?.();

      stopWatcher = watch(
        () => capabilities.getIncotermsOptions(field.form),
        (options) => {
          setFieldProp(field, PROP_OPTIONS, options);

          if (options.length === 1 && field.ref.value !== options[0].value) {
            setFieldRef(field, options[0].value);
          }
        },
        {immediate: true},
      );
    },
  });
};
