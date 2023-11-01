import {openUrl} from '../../utils';

/**
 * Opens a new window with the given base64 encoded pdf.
 */
export const openPdfInNewWindow = async (pdf: string): Promise<void> => {
  const blob = await (await fetch(`data:application/pdf;base64,${pdf}`)).blob();

  openUrl(URL.createObjectURL(blob));
};
