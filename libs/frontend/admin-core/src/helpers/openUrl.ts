/**
 * Opens a new tab with the given URL. Avoids popup blockers by creating a hidden link.
 */
export const openUrl = (url: string, attributes: Record<string, string> = {}): void => {
  const link = document.createElement('a');

  link.href = url;

  Object.entries(attributes).forEach(([key, value]) => {
    link.setAttribute(key, value);
  });

  document.body.appendChild(link);
  window.open(link.href, '_blank');
  link.remove();
};
