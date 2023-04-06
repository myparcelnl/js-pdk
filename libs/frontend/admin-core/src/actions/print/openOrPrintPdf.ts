import {downloadPdf, openPdfInNewWindow} from '../../services';
import {ActionContextWithResponse} from '../executors';
import {PdfDataResponse} from '../../sdk';
import {PrintAction} from '../../types';
import {generateLabelFilename} from '../../utils';
import {isOfType} from '@myparcel/ts-utils';

export const openOrPrintPdf = async <A extends PrintAction>({
  response,
  parameters,
}: ActionContextWithResponse<A>): Promise<void> => {
  if (isOfType<PdfDataResponse>(response, 'data')) {
    return openPdfInNewWindow(response.data);
  }

  await downloadPdf(response.url, generateLabelFilename(parameters));
};
