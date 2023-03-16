export const useAssetUrl = (path?: string): string => {
  path ??= '';

  if (path.startsWith('/')) {
    path = path.slice(1);
  }

  return `https://assets.myparcel.nl/${path}`;
};
