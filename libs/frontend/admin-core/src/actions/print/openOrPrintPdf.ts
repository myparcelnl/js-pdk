import {isOfType} from '@myparcel/ts-utils';
import {ActionContextWithResponse} from '../executors';
import {generateLabelFilename} from '../../utils';
import {PrintAction} from '../../types';
import {downloadPdf, openPdfInNewWindow} from '../../services';
import {PdfDataResponse} from '../../sdk';

export const openOrPrintPdf = async <A extends PrintAction>({
  response,
  parameters,
}: ActionContextWithResponse<A>): Promise<void> => {
  if (isOfType<PdfDataResponse>(response, 'data')) {
    return openPdfInNewWindow(response.data);
  }

  await downloadPdf(response.url, generateLabelFilename(parameters));
};
