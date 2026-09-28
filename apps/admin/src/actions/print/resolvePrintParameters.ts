import {toArray} from '@myparcel-dev/ts-utils';
import {type ActionContext} from '../executors';
import {type ActionParameters, type PrintAction} from '../../types';
import {showLabelsLoading} from '../../services';
import {usePluginSettings} from '../../composables';
import {waitForLabelPrompt} from './waitForLabelPrompt';

const resolveParameters = <A extends PrintAction>(context: ActionContext<A>): Promise<ActionParameters<A>> => {
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

/** Resolves the label options, then shows the loading notification that openOrPrintPdf closes. */
export const resolvePrintParameters = async <A extends PrintAction>(
  context: ActionContext<A>,
): Promise<ActionParameters<A>> => {
  const parameters = await resolveParameters(context);

  showLabelsLoading();

  return parameters;
};
