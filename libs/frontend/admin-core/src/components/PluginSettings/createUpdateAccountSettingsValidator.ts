import {memoize} from 'lodash-unified';
import {type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type AdminAction} from '../../types';
import {type ActionContext, executeAction} from '../../actions';

const memoizedActionValidator = memoize(async (context: ActionContext<AdminAction>) => {
  const response = await executeAction(context);

  return Boolean(response);
});

export const createUpdateAccountSettingsValidator =
  (
    actionContext: ActionContext<AdminAction.AccountUpdate>,
  ): ((field: InteractiveElementInstance) => Promise<boolean>) =>
  async (field: InteractiveElementInstance) => {
    if (!field.ref.value) {
      return false;
    }

    return memoizedActionValidator({...actionContext, parameters: {form: field.form}});
  };
