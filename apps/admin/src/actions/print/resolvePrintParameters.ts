import {toArray} from '@myparcel/ts-utils';
import {type ActionContext} from '../executors/types';
import {type ActionParameters} from '../../types/actions/parameters.types';
import {type PrintAction} from '../../types/actions/actions.types';
import {usePluginSettings} from '../../composables/context/usePluginSettings';
import {waitForLabelPrompt} from './waitForLabelPrompt';

export const resolvePrintParameters = <A extends PrintAction>(
  context: ActionContext<A>,
): Promise<ActionParameters<A>> => {
  const pluginSettings = usePluginSettings();

  if (!pluginSettings.label.prompt) {
    const {output, position, format} = pluginSettings.label;

    return Promise.resolve({
      ...(context.parameters as ActionParameters<A>),
      output,
      format,
      position: toArray(position),
    });
  }

  return waitForLabelPrompt(context);
};
