import {isOfType} from '@myparcel/ts-utils';
import {type ActionContextWithResponse} from '../executors';
import {generateLabelFilename} from '../../utils';
import {type PrintAction} from '../../types';
import {downloadPdf, openPdfInNewWindow} from '../../services';
import {type PdfDataResponse} from '../../sdk';

export const openOrPrintPdf = async <A extends PrintAction>({
  response,
  parameters,
}: ActionContextWithResponse<A>): Promise<void> => {
  if (isOfType<PdfDataResponse>(response, 'data')) {
    return openPdfInNewWindow(response.data);
  }

  await downloadPdf(response.url, generateLabelFilename(parameters));
};
