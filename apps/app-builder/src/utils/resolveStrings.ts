import {get} from 'lodash-unified';
import {type OneOrMore, toArray} from '@myparcel/ts-utils';
import {type StringGenerator} from '../types/common';
import {type PdkBuilderContext} from '../types/command';
import {type PdkPlatformName} from '../constants';
import {resolveString} from './resolveString';

type PdkBuilderContextWithPlatform = PdkBuilderContext<{platform?: PdkPlatformName}>;

const MARKER_SIZE = 2;

const resolveStringGenerator = (stringGenerator: StringGenerator, context: PdkBuilderContextWithPlatform): string => {
  return typeof stringGenerator === 'function' ? stringGenerator(context.args?.platform) : stringGenerator;
};

const getMarkers = (item: string) => item.match(/\{\{\s*([\w.]+)\s*}}/g) ?? [];

const resolveMarker = (marker: string, context: PdkBuilderContextWithPlatform): string | string[] => {
  const key = marker
    .substring(MARKER_SIZE, marker.length - MARKER_SIZE)
    .trim()
    .split('.');

  return get(context.args, key, get(context.config, key, ''));
};

const hasMarkers = (string: string) => string.includes('{{');

const resolveOne = (stringGenerator: StringGenerator, context: PdkBuilderContextWithPlatform) => {
  const string = resolveStringGenerator(stringGenerator, context);

  if (!hasMarkers(string)) {
    return string;
  }

  return getMarkers(string).reduce((acc, marker): string => {
    const value = resolveMarker(marker, context);

    return Array.isArray(value) ? acc : acc.replace(marker, resolveString(resolveOne(value, context), context));
  }, string);
};

const resolveMultiple = (stringGenerator: StringGenerator, context: PdkBuilderContextWithPlatform): string[] => {
  const string = resolveStringGenerator(stringGenerator, context);

  if (!hasMarkers(string)) {
    return [string];
  }

  return getMarkers(string).reduce((acc, marker) => {
    const value = resolveMarker(marker, context);

    return Array.isArray(value)
      ? [...acc, ...value.map((subValue) => string.replace(marker, resolveOne(subValue, context)))]
      : acc;
  }, [] as string[]);
};

const resolve = (item: StringGenerator, context: PdkBuilderContext<{platform?: PdkPlatformName}>): string[] => {
  const firstPass = resolveOne(item, context);
  const secondPass = resolveMultiple(firstPass, context);

  return secondPass.reduce((acc, item) => {
    if (hasMarkers(item)) {
      acc.push(...resolve(item, context));
    } else {
      acc.push(item);
    }

    return acc;
  }, [] as string[]);
};

/**
 * Replaces values in strings with values from config.
 *
 * @example `{{outDir}}/src` => `dist/src` (if `config.outDir` is `dist`)
 */
export const resolveStrings = (
  context: PdkBuilderContextWithPlatform,
  strings: OneOrMore<StringGenerator>,
): string[] => {
  return toArray(strings)
    .filter(Boolean)
    .reduce((acc, item) => {
      acc.push(...resolve(item, context));

      return acc;
    }, [] as string[]);
};
