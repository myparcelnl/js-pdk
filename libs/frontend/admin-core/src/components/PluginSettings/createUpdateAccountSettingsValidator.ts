import {memoize} from 'lodash-unified';
import {type InteractiveElementInstance, type FormInstance} from '@myparcel/vue-form-builder';
import {type AdminAction} from '../../types';
import {type ActionContext, executeAction} from '../../actions';

const memoizedActionValidator = memoize(
  async (context: ActionContext<AdminAction>) => {
    const response = await executeAction(context);

    return Boolean(response);
  },
  (context) => JSON.stringify((context.parameters as {form?: FormInstance})?.form?.getValues()),
);

export const createUpdateAccountSettingsValidator =
  (
    actionContext: ActionContext<AdminAction.AccountUpdate>,
  ): ((field: InteractiveElementInstance) => Promise<boolean>) =>
  async (field: InteractiveElementInstance) => {
    return memoizedActionValidator({...actionContext, parameters: {form: field.form}});
  };
