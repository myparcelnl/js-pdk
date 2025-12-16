import {get} from 'radash';
import {type OneOrMore, toArray} from '@myparcel-dev/ts-utils';
import {type PdkBuilderContext} from '../types/command.types';
import {resolveString} from './resolveString';

const MARKER_SIZE = 2;

const getMarkers = (item: string) => item.match(/\{\{\s*([\w.]+)\s*}}/g) ?? [];

const resolveMarker = (context: PdkBuilderContext, marker: string): string | string[] => {
  const key = marker.substring(MARKER_SIZE, marker.length - MARKER_SIZE).trim();
  return get(context.args, key, get(context.config, key, ''));
};

const hasMarkers = (string: string) => string.includes('{{');

const resolveOne = (context: PdkBuilderContext, string: string) => {
  if (!hasMarkers(string)) {
    return string;
  }

  return getMarkers(string).reduce((acc, marker): string => {
    const value = resolveMarker(context, marker);

    return Array.isArray(value) ? acc : acc.replace(marker, resolveString(resolveOne(context, value), context));
  }, string);
};

const resolveMultiple = (context: PdkBuilderContext, string: string): string[] => {
  if (!hasMarkers(string)) {
    return [string];
  }

  return getMarkers(string).reduce((acc, marker) => {
    const value = resolveMarker(context, marker);

    return Array.isArray(value)
      ? [...acc, ...value.map((subValue) => string.replace(marker, resolveOne(context, subValue)))]
      : acc;
  }, [] as string[]);
};

const resolve = (context: PdkBuilderContext, item: string): string[] => {
  const firstPass = resolveOne(context, item);
  const secondPass = resolveMultiple(context, firstPass);

  return secondPass.reduce((acc, item) => {
    if (hasMarkers(item)) {
      acc.push(...resolve(context, item));
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
export const resolveStrings = (context: PdkBuilderContext, strings: OneOrMore<string>): string[] => {
  return toArray(strings)
    .filter(Boolean)
    .reduce((acc, item) => {
      acc.push(...resolve(context, item));

      return acc;
    }, [] as string[]);
};
