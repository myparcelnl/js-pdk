import {type ImportSheetConfig} from '@edielemoine/google-docs-importer';
import {type PdkBuilderContext} from '../../types/command.types';

export interface SheetDefinition extends ImportSheetConfig {
  name: string;
  sheetId: number;
  documentId?: string;
}

export interface PdkBuilderTranslationsContext extends PdkBuilderContext {
  tmpDir: string;
}
