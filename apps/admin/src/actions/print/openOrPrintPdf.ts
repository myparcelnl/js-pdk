import {isOfType} from '@myparcel/ts-utils';
import {type ActionContextWithResponse} from '../executors';
import {generateLabelFilename} from '../../utils';
import {type PdfDataResponse, type PrintAction} from '../../types';
import {downloadPdf, openPdfInNewWindow} from '../../services';

export const openOrPrintPdf = async <A extends PrintAction>({
  response,
  parameters,
}: ActionContextWithResponse<A>): Promise<void> => {
  if (isOfType<PdfDataResponse>(response, 'data')) {
    return openPdfInNewWindow(response.data);
  }

  await downloadPdf(response.url, generateLabelFilename(parameters));
};
