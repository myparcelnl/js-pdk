import {type PdkBuilderTranslationsContext, type SheetDefinition} from './types';
import {DEFAULT_SHEET_NAME, DELIVERY_OPTIONS} from './constants';

export const getSheetsToImport = ({config}: PdkBuilderTranslationsContext): SheetDefinition[] => {
  const sheets: SheetDefinition[] = [
    {
      name: DEFAULT_SHEET_NAME,
      sheetId: config.translations.sheetId,
    },
    {
      name: DELIVERY_OPTIONS,
      sheetId: config.translations.sheetIdDeliveryOptions,
      documentId: config.translations.documentIdDeliveryOptions,
      prefix: 'delivery_options_',
    },
  ];

  if (config.translations.additionalSheet) {
    sheets.push({
      name: 'app',
      sheetId: config.translations.additionalSheet,
    });
  }

  return sheets;
};
