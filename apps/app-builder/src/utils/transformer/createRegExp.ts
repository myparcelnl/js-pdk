export const createRegExp = (search: string, exceptions: string[]): RegExp => {
  return new RegExp(`${search}(?![\\\\/](?:${exceptions.join('|')}))`, 'igm');
};
