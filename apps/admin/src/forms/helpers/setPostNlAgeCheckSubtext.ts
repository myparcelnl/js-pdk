import {type InteractiveElementInstance} from '@myparcel-dev/vue-form-builder';
import {CarrierName} from '@myparcel-dev/constants';
import {AGE_CHECK, FIELD_AGE_CHECK, KEY_SUBTEXT} from '../shipmentOptions';
import {setFieldProp} from './setFieldProp';
import {hasPostNlAgeCheck} from './hasPostNlAgeCheck';
import {getFieldLabel} from './getFieldLabel';
import {createLabel} from './createLabel';

export const setPostNlAgeCheckSubtext = ({form}: InteractiveElementInstance): void => {
  const defaultKey = createLabel(getFieldLabel(AGE_CHECK), KEY_SUBTEXT);

  if (hasPostNlAgeCheck(form)) {
    setFieldProp(form, FIELD_AGE_CHECK, KEY_SUBTEXT, `${defaultKey}_${CarrierName.PostNl}`);
  } else {
    setFieldProp(form, FIELD_AGE_CHECK, KEY_SUBTEXT, defaultKey);
  }
};
