import {DateFormat} from '@myparcel-pdk/common';
import {padNumber} from './padNumber';

export const formatDate = (dateString: string, format: DateFormat = 'dateFormatLite'): string => {
  if (!dateString) {
    return '(No date)';
  }

  const date = new Date(dateString);

  const formatString = 'Y-m-d H:i:s';

  return formatString
    .replace('d', padNumber(date.getDate()))
    .replace('m', padNumber(date.getMonth() + 1))
    .replace('Y', date.getFullYear().toString())
    .replace('H', padNumber(date.getHours()))
    .replace('i', padNumber(date.getMinutes()))
    .replace('s', padNumber(date.getSeconds()));
};
