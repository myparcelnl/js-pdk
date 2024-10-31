import fs from 'node:fs';
import chalk from 'chalk';
import {resolvePath} from '../../utils/resolvePath';
import {parseJsonFile} from '../../utils/parseJsonFile';
import {writeFile} from '../../utils/fs/writeFile';
import {executePromises} from '../../utils/executePromises';
import {isVeryVerbose} from '../../utils/command/isVeryVerbose';
import {isVerbose} from '../../utils/command/isVerbose';
import {type PdkBuilderTranslationsContext, type SheetDefinition} from './types';
import {DEFAULT_SHEET_NAME} from './constants';

const EXTENSION_JSON = '.json';

export const mergeTranslations = async (
  context: PdkBuilderTranslationsContext,
  items: SheetDefinition[],
): Promise<void> => {
  context.debug('Merging translations...');

  const resolvedOutDir = resolvePath(context.config.translations.outDir, context);

  const languages = (await fs.promises.readdir(resolvePath([context.tmpDir, DEFAULT_SHEET_NAME], context)))
    .filter((file) => file.endsWith(EXTENSION_JSON))
    .map((file) => file.replace(EXTENSION_JSON, ''));

  const promises = languages.map(async (language) => {
    if (isVerbose(context)) {
      context.debug(`Merging translations for language "${chalk.cyan(language)}"`);
    }

    const translations = items.reduce((acc, {name}) => {
      const filePath = resolvePath([context.config.tmpDir, 'translations', name, `${language}.json`], context);

      if (isVeryVerbose(context)) {
        context.debug(`Merging translations from "${chalk.yellow(name)}" into "${chalk.cyan(language)}"`);
      }

      return {...acc, ...parseJsonFile(filePath)};
    }, {});

    await writeFile(
      context,
      [resolvedOutDir, `${language}${EXTENSION_JSON}`],
      JSON.stringify(translations, null, context.config.jsonSpaces),
    );
  });

  await executePromises(context.args, promises);
};
