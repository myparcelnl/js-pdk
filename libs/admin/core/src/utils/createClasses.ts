import {type MaybeRef} from '@vueuse/core';

type ClassValue = MaybeRef<string | number | boolean | undefined>;

type ClassDefinition = {
  key: string | undefined;
  value: ClassValue;
};

export const createClasses = (param: ClassDefinition[]): Record<string, ClassValue> => {
  return param.reduce((acc, {key, value}) => {
    if (key && value) {
      acc[key] = value;
    }

    return acc;
  }, {} as Record<string, ClassValue>);
};
