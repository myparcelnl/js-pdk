import {ActionParameters, ActionResponse, FrontendAction} from '../consts';
import {PdkLogger} from '../../services';

export type ActionContext<A extends FrontendAction = FrontendAction> = {
  action: A;
  parameters?: Partial<ActionParameters<A>>;
  logger?: PdkLogger;
};

export type ActionContextWithResponse<A extends FrontendAction> = ActionContext & {
  response: ActionResponse<A>;
};
