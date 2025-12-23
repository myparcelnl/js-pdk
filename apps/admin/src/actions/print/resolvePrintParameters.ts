import {toArray} from '@myparcel-dev/ts-utils';
import {type ActionContext} from '../executors';
import {type ActionParameters, type PrintAction} from '../../types';
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
