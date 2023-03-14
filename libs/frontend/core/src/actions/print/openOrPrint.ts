import {downloadPdf, openPdfInNewWindow} from '../../services';
import {ActionContextWithResponse} from '../executors';
import {PrintAction} from '../../types';
import {generateLabelFilename} from '../../utils';

export const openOrPrint = async <A extends PrintAction>(context: ActionContextWithResponse<A>): Promise<void> => {
  // @ts-expect-error todo
  if (context.parameters.open === 'download') {
    // @ts-expect-error todo
    await downloadPdf(context.response.url, generateLabelFilename(context.parameters));
    return;
  }

  // todo
  openPdfInNewWindow();
};
