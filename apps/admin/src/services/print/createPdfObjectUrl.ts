/** Turns a base64 pdf into an object url that a link can open or download. */
export const createPdfObjectUrl = (pdf: string): string => {
  const bytes = Uint8Array.from(atob(pdf), (char) => char.charCodeAt(0));

  return URL.createObjectURL(new Blob([bytes], {type: 'application/pdf'}));
};
