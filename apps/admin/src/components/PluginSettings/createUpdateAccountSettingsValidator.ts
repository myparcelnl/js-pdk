import {memoize} from 'lodash-unified';
import {type FormInstance, type InteractiveElementInstance} from '@myparcel/vue-form-builder';
import {type AdminAction} from '../../data/constants';
import {type ActionContext} from '../../actions/executors/types';
import {executeAction} from '../../actions/executors/executeAction';

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
