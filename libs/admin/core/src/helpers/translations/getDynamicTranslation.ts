export const getDynamicTranslation = (prefix: string, input?: string): string => {
  if (!input) {
    return prefix;
  }

  return `${prefix}_${input}`;
};
