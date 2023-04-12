import chalk from 'chalk';

export const logPlatforms = (platforms: string[]): string => {
  return chalk.yellowBright(platforms.join(', '));
};
