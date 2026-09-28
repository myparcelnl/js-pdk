import {isOfType} from '@myparcel-dev/ts-utils';
import {type PdfDataResponse, type PdfPendingResponse} from '../../types';
import {usePdkAdminApi} from '../../sdk';

type PollOptions = {
  interval?: number;
  timeout?: number;
};

const DEFAULT_INTERVAL = 3000;

/** Ten minutes. */
const DEFAULT_TIMEOUT = 600_000;

/**
 * Ask the backend for a labels pdf until the API has generated it. Resolves with the base64 pdf.
 */
export const pollLabelPdf = async (
  labelId: string,
  {interval = DEFAULT_INTERVAL, timeout = DEFAULT_TIMEOUT}: PollOptions = {},
): Promise<string> => {
  const pdk = usePdkAdminApi();
  const start = Date.now();

  for (;;) {
    const response = (await pdk.fetchLabelPdf({
      // @ts-expect-error custom endpoints are not typed correctly
      parameters: {labelId},
    })) as PdfDataResponse | PdfPendingResponse;

    if (isOfType<PdfDataResponse>(response, 'data')) {
      return response.data;
    }

    if (Date.now() - start >= timeout) {
      throw new Error(`Polling for label pdf ${labelId} timed out`);
    }

    await new Promise((resolve) => {
      setTimeout(resolve, interval);
    });
  }
};
