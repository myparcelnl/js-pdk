import {usePdfWindow} from '../composables';

/**
 * Creates a new window from given base64 encoded pdf string.
 */
export function openPdfInNewWindow(pdf: string): void {
  const buffer = btoa(pdf);
  const file = new Blob([buffer], {type: 'application/pdf;base64'});
  const fileUrl = URL.createObjectURL(file);

  const {pdfWindow} = usePdfWindow();

  if (pdfWindow.value) {
    pdfWindow.value.document.dispatchEvent(new CustomEvent('myparcel_label_ready', {detail: fileUrl}));
  }
}
