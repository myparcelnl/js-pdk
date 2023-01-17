import {ActionParameters, ActionResponse, FrontendAction} from '../consts';
import {PdkAppInstance} from '../../data';

export type ActionContext<A extends FrontendAction = FrontendAction> = {
  action: A;
  parameters?: Partial<ActionParameters<A>>;
  instance: PdkAppInstance;
};

export type ActionContextWithResponse<A extends FrontendAction> = ActionContext & {
  response: ActionResponse<A>;
};
