export const createRegExp = (search: string, exceptions: string[]): RegExp => {
  return new RegExp(`${search}(?![\\\\/.]{1,2}(${exceptions.join('|')}))`, 'igm');
};
