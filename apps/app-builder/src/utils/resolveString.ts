import {type PdkPlatformName, type StringGenerator} from '../types';

export const resolveString = (stringGenerator: StringGenerator, platform: PdkPlatformName | undefined): string => {
  return typeof stringGenerator === 'function' ? stringGenerator(platform) : stringGenerator;
};
