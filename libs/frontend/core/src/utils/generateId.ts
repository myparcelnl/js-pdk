/* eslint-disable @typescript-eslint/no-magic-numbers */
export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};
