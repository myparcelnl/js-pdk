/**
 * Try to get the pdf url. An error means the pdf file is not ready yet. Retry until it is, then download the label.
 */
export async function downloadPdf(pdf: string, filename: string): Promise<void> {
  try {
    const response = await fetch(pdf);
    const blob = await response.blob();
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.setAttribute('download', `myparcel-label-${filename}.pdf`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  } catch (e) {
    await new Promise((resolve) => {
      setTimeout(resolve, 100);
    });

    return downloadPdf(pdf, filename);
  }
}
