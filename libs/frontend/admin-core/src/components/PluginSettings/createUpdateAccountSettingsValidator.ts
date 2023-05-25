import {ActionContext, executeAction} from '../../actions';
import {AdminAction} from '../../types';
import {InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {memoize} from 'lodash-unified';

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
