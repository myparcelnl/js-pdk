import {ActionContextWithResponse} from '../executors';
import {LABEL_OUTPUT_OPEN} from '../../data';
import {PrintAction} from '../../types';
import {downloadPdf} from '../../services';
import {generateLabelFilename} from '../../utils';

export const openOrPrint = async <A extends PrintAction>(context: ActionContextWithResponse<A>): Promise<void> => {
  // @ts-expect-error todo
  if (context.parameters.output === LABEL_OUTPUT_OPEN) {
    console.log('open');
    // todo
    // openPdfInNewWindow();
    return;
  }

  console.log('download');
  // @ts-expect-error todo
  await downloadPdf(context.response.url, generateLabelFilename(context.parameters));
};
