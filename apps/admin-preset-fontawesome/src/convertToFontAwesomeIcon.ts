import {AdminIcon} from '@myparcel-pdk/frontend-core/src';
import {memoize} from 'lodash-unified';

const PDK_FONT_AWESOME_ICON_MAP: Partial<Record<AdminIcon, string>> = {
  [AdminIcon.ADD]: 'fas fa-plus',
  [AdminIcon.ARROW_DOWN]: 'fas fa-arrow-down',
  [AdminIcon.ARROW_UP]: 'fas fa-arrow-up',
  [AdminIcon.CLOSE]: 'fas fa-times',
  [AdminIcon.DELETE]: 'fas fa-trash',
  [AdminIcon.DOWNLOAD]: 'fas fa-download',
  [AdminIcon.EDIT]: 'fas fa-edit',
  [AdminIcon.EXPORT]: 'fas fa-file-export',
  [AdminIcon.EXTERNAL]: 'fas fa-external-link-alt',
  [AdminIcon.NO]: 'fas fa-times',
  [AdminIcon.PRINT]: 'fas fa-print',
  [AdminIcon.REFRESH]: 'fas fa-sync',
  [AdminIcon.RETURN]: 'fas fa-reply',
  [AdminIcon.SAVE]: 'fas fa-save',
  [AdminIcon.SPINNER]: 'fas fa-spinner',
  [AdminIcon.YES]: 'fas fa-check',
};

export const convertToFontAwesomeIcon = memoize((icon: AdminIcon): string | undefined => {
  return PDK_FONT_AWESOME_ICON_MAP[icon];
});
