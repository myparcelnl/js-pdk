import {memoize} from 'lodash-unified';
import {AdminIcon} from '@myparcel-pdk/frontend-admin-core';

const PDK_FONT_AWESOME_ICON_MAP: Partial<Record<AdminIcon, string>> = {
  [AdminIcon.Add]: 'fas fa-plus',
  [AdminIcon.ArrowDown]: 'fas fa-arrow-down',
  [AdminIcon.ArrowUp]: 'fas fa-arrow-up',
  [AdminIcon.Close]: 'fas fa-times',
  [AdminIcon.Delete]: 'fas fa-trash',
  [AdminIcon.Download]: 'fas fa-download',
  [AdminIcon.Edit]: 'fas fa-edit',
  [AdminIcon.Export]: 'fas fa-file-export',
  [AdminIcon.External]: 'fas fa-external-link-alt',
  [AdminIcon.No]: 'fas fa-times',
  [AdminIcon.Print]: 'fas fa-print',
  [AdminIcon.Refresh]: 'fas fa-sync',
  [AdminIcon.Return]: 'fas fa-reply',
  [AdminIcon.Save]: 'fas fa-save',
  [AdminIcon.Spinner]: 'fas fa-spinner',
  [AdminIcon.Yes]: 'fas fa-check',
};

export const convertToFontAwesomeIcon = memoize((icon: AdminIcon): string | undefined => {
  return PDK_FONT_AWESOME_ICON_MAP[icon];
});
