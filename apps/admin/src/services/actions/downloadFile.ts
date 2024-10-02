import {downloadFileFromUrl} from '../../utils';

/**
 * Try to get a file from an url. An error means the file is not ready yet. Retry until it is.
 */
export async function downloadFile(url: string, filename: string): Promise<void> {
  try {
    downloadFileFromUrl(url, filename);
  } catch (e) {
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    return downloadFile(url, filename);
  }
}
