export const createBanner = (): string => {
  return `/** ${process.env.npm_package_name} v${process.env.npm_package_version} */`;
};
