import {ActionParameters, FrontendAction} from '../consts';
import {useFormBuilder} from '@myparcel/vue-form-builder';

export const beforeFormAction = async <A extends FrontendAction>(
  action: A,
  parameters: Partial<ActionParameters<A>> = {},
): Promise<ActionParameters<A>> => {
  const formBuilder = useFormBuilder();

  // @ts-expect-error todo
  parameters.form = formBuilder.forms[action];

  return Promise.resolve(parameters as ActionParameters<A>);
};
