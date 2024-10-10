import {downloadFileFromUrl} from './downloadFileFromUrl';

export const downloadBlob = (blob: Blob, filename: string): void => {
  const url = URL.createObjectURL(blob);

  downloadFileFromUrl(url, filename);

  URL.revokeObjectURL(url);
};
