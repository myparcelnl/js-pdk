import {fakeLinkClick} from './fakeLinkClick';

export const openUrlInNewTab = (url: string, attributes: Record<string, string> = {}): void => {
  fakeLinkClick(url, {target: '_blank', rel: 'noopener noreferrer', ...attributes});
};
