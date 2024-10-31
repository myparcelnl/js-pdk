import chalk from 'chalk';
import {importTranslations} from '@edielemoine/google-docs-importer';
import {getRelativePath} from '../../utils/getRelativePath';
import {executePromises} from '../../utils/executePromises';
import {isDryRun} from '../../utils/command/isDryRun';
import {type PdkBuilderTranslationsContext, type SheetDefinition} from './types';

export const importSheets = async (
  context: PdkBuilderTranslationsContext,
  sheets: SheetDefinition[],
): Promise<void> => {
  const {args, debug, tmpDir, config} = context;

  const importPromises = sheets.map(async (sheet) => {
    debug(`Importing translations sheet "${chalk.green(sheet.name)}"`);

    if (isDryRun(context)) {
      return;
    }

    const resolvedConfig = {
      columnKey: 'lang',
      documentId: config.translations.documentId,
      filenamePrefix: '',
      prefix: '',
      outputDir: getRelativePath([tmpDir, sheet.name], context),
      ...sheet,
      sheetId: String(sheet.sheetId),
    };

    return importTranslations({
      config: resolvedConfig,
      debug: debug.extend(`import:${sheet.name}`),
      verbosity: args.verbose,
    });
  });

  await executePromises(args, importPromises);
};
