import {ActionParameters, FrontendAction} from '../consts';
import {ActionContext} from './types';
import {useFormBuilder} from '@myparcel/vue-form-builder';

export const beforeFormAction = async <A extends FrontendAction>({
  action,
  parameters,
}: ActionContext<A>): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();

  // @ts-expect-error todo
  parameters.form = formBuilder.forms[action];

  return Promise.resolve(parameters as ActionParameters<A>);
};
