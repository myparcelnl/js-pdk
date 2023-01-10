/* eslint-disable @typescript-eslint/no-magic-numbers */

/**
 * @deprecated
 */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
