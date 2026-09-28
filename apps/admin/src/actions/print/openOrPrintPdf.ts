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
): Promise<void> => {
  let url: string;

  try {
    url = createPdfObjectUrl(await pollLabelPdf(labelId));
  } catch (error) {
    showLabelsFailed();
    return;
  }

  if (parameters?.output === 'download') {
    hideLabelsNotification();
    downloadFileFromUrl(url, generateLabelFilename(parameters));
    return;
  }

  showLabelsReady(() => openUrlInNewTab(url));
};

export const openOrPrintPdf = async <A extends PrintAction>({
  response,
  parameters,
}: ActionContextWithResponse<A>): Promise<void> => {
  if (isOfType<PdfUrlResponse>(response, 'labelId') && response.labelId) {
    return openPreparedPdf(response.labelId, parameters);
  }

  hideLabelsNotification();

  if (!response) {
    return;
  }

  if (isOfType<PdfDataResponse>(response, 'data')) {
    return openPdfInNewWindow(response.data);
  }

  await downloadFile(response.url, generateLabelFilename(parameters));
};
