import {isOfType} from '@myparcel/ts-utils';
import {type ActionContextWithResponse} from '../executors/types';
import {generateLabelFilename} from '../../utils/generateLabelFilename';
import {type PdfDataResponse} from '../../types/sdk.types';
import {type PrintAction} from '../../types/actions/actions.types';
import {openPdfInNewWindow} from '../../services/print/openPdfInNewWindow';
import {downloadFile} from '../../services/actions/downloadFile';

export const openOrPrintPdf = async <A extends PrintAction>({
  response,
  parameters,
}: ActionContextWithResponse<A>): Promise<void> => {
  if (isOfType<PdfDataResponse>(response, 'data')) {
    return openPdfInNewWindow(response.data);
  }

  await downloadFile(response.url, generateLabelFilename(parameters));
};
