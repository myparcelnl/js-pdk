import {AdminIcon} from '@myparcel-pdk/frontend-core/src';
import {memoize} from 'lodash-unified';

const PDK_DASH_ICON_MAP: Partial<Record<AdminIcon, string>> = {
  [AdminIcon.ADD]: 'plus',
  [AdminIcon.ARROW_DOWN]: 'arrow-down',
  [AdminIcon.ARROW_UP]: 'arrow-up',
  [AdminIcon.CLOSE]: 'no',
  [AdminIcon.DELETE]: 'trash',
  [AdminIcon.DOWNLOAD]: 'download',
  [AdminIcon.EDIT]: 'edit',
  [AdminIcon.EXPORT]: 'share-alt2',
  [AdminIcon.EXTERNAL]: 'external',
  [AdminIcon.NO]: 'no',
  [AdminIcon.PRINT]: 'printer',
  [AdminIcon.REFRESH]: 'update',
  [AdminIcon.RETURN]: 'undo',
  [AdminIcon.SAVE]: 'yes',
  [AdminIcon.SPINNER]: 'update',
  [AdminIcon.YES]: 'yes',
};

export const convertToDashIcon = memoize((icon: AdminIcon): string | undefined => {
  return PDK_DASH_ICON_MAP[icon];
});
