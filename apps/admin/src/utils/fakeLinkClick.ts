/**
 * Creates and clicks a link with the given URL. Avoids popup blockers by creating a hidden link element.
 */
export const fakeLinkClick = (url: string, attributes: Record<string, string>): void => {
  const link = document.createElement('a');

  link.href = url;

  Object.entries(attributes).forEach(([key, value]) => {
    link.setAttribute(key, value);
  });

  document.body.appendChild(link);

  link.click();
  link.remove();
};
