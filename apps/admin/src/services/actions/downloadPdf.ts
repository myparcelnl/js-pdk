import {openUrl} from '../../utils';

/**
 * Try to get the pdf url. An error means the pdf file is not ready yet. Retry until it is, then download the label.
 */
export async function downloadPdf(url: string, filename: string): Promise<void> {
  try {
    openUrl(url, {download: filename});
  } catch (e) {
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    return downloadPdf(url, filename);
  }
}
