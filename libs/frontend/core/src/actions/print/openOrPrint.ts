import {downloadPdf, openPdfInNewWindow} from '../../services';
import {ActionContextWithResponse} from '../executors';
import {LABEL_OUTPUT_DOWNLOAD} from '../../data';
import {PrintAction} from '../../types';
import {generateLabelFilename} from '../../utils';

export const openOrPrint = async <A extends PrintAction>(context: ActionContextWithResponse<A>): Promise<void> => {
  // @ts-expect-error todo
  if (context.parameters.open === LABEL_OUTPUT_DOWNLOAD) {
    // @ts-expect-error todo
    await downloadPdf(context.response.url, generateLabelFilename(context.parameters));
    return;
  }

  // todo
  openPdfInNewWindow();
};
