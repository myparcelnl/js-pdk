import {fakeLinkClick} from './fakeLinkClick';

export const downloadFileFromUrl = (url: string, filename: string): void => {
  fakeLinkClick(url, {download: filename});
};
