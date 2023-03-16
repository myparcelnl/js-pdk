import {ActionParameters, PrintAction} from '../../types';
import {ActionContext} from '../executors';
import {toArray} from '@myparcel/ts-utils';
import {usePluginSettings} from '../../composables';
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
