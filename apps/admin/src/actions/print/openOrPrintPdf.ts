import {type Pinia} from 'pinia';
import {isOfType} from '@myparcel-dev/ts-utils';
import {type ActionContextWithResponse} from '../executors';
import {downloadFileFromUrl, generateLabelFilename, openUrlInNewTab} from '../../utils';
import {type PdfDataResponse, type PdfUrlResponse, type PrintAction} from '../../types';
import {
  createPdfObjectUrl,
  downloadFile,
  hideLabelsNotification,
  openPdfInNewWindow,
  pollLabelPdf,
  showLabelsFailed,
  showLabelsReady,
} from '../../services';

/**
 * A link means the API prepares the pdf in the background. Wait for it, then offer a button to
 * open it, because browsers block a new tab that does not come directly from a click.
 */
const openPreparedPdf = async <A extends PrintAction>(
  labelId: string,
  parameters: ActionContextWithResponse<A>['parameters'],
  pinia?: Pinia,
): Promise<void> => {
  let url: string;

  try {
    url = createPdfObjectUrl(await pollLabelPdf(labelId));
  } catch (error) {
    showLabelsFailed(pinia);
    return;
  }

  if (parameters?.output === 'download') {
    hideLabelsNotification(pinia);
    downloadFileFromUrl(url, generateLabelFilename(parameters));
    URL.revokeObjectURL(url);
    return;
  }

  showLabelsReady(() => openUrlInNewTab(url), pinia);
};

export const openOrPrintPdf = async <A extends PrintAction>({
  response,
  parameters,
  instance,
}: ActionContextWithResponse<A>): Promise<void> => {
  // The store of the admin that started the print: a pdf can take a while.
  const pinia = instance?.store;

  if (isOfType<PdfUrlResponse>(response, 'labelId') && response.labelId) {
    return openPreparedPdf(response.labelId, parameters, pinia);
  }

  hideLabelsNotification(pinia);

  if (!response) {
    return;
  }

  if (isOfType<PdfDataResponse>(response, 'data')) {
    return openPdfInNewWindow(response.data);
  }

  await downloadFile(response.url, generateLabelFilename(parameters));
};
