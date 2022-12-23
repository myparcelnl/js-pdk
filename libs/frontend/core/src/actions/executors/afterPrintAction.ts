import {ActionParameters, ActionResponse, printActions} from '../index';
import {useLogger} from '../../composables/useLogger';

export const afterPrintAction = async <A extends typeof printActions[number]>(
  action: A,
  parameters: ActionParameters<A>,
  response: ActionResponse<A>,
): Promise<ActionResponse<A>> => {
  const logger = useLogger();

  logger.debug('Please pretend your pdf was just downloaded or opened. 🚀');

  return Promise.resolve(response);
};
