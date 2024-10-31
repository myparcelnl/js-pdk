import {resolvePath} from '../../utils/resolvePath';
import {deleteDirectory} from '../../utils/fs/deleteDirectory';
import {type PdkBuilderCommand} from '../../types/command.types';
import {type PdkBuilderTranslationsContext} from './types';
import {mergeTranslations} from './mergeTranslations';
import {importSheets} from './importSheets';
import {getSheetsToImport} from './getSheetsToImport';

const translations = (async (inputContext) => {
  const tmpDir = resolvePath([inputContext.config.tmpDir, 'translations'], inputContext);
  const context: PdkBuilderTranslationsContext = {...inputContext, tmpDir};

  const sheets = getSheetsToImport(context);

  await importSheets(context, sheets);
  await mergeTranslations(context, sheets);

  await deleteDirectory(context, context.tmpDir);
}) satisfies PdkBuilderCommand;

export default translations;
