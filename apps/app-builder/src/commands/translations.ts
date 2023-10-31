/* eslint-disable max-lines-per-function,@typescript-eslint/no-magic-numbers */
import fs from 'fs';
import chalk from 'chalk';
import {importTranslations} from '@edielemoine/google-docs-importer';
import {
  executePromises,
  getRelativePath,
  isVerbose,
  isVeryVerbose,
  parseJsonFile,
  resolvePath,
  rmDir,
  writeFile,
} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {PLATFORM_SHEET_ID_MAP} from '../constants';

interface SheetDefinition {
  name: string;
  sheetId: number;
}

const DEFAULT_SHEET_NAME = 'default';

const translations: PdkBuilderCommand = async (context) => {
  const {config, args, debug} = context;
  const {documentId, outDir, additionalSheet, sheetId} = config.translations;

  const resolvedOutDir = resolvePath(outDir, context);
  const tmpDir = resolvePath([config.tmpDir, 'translations'], context);

  const items: SheetDefinition[] = [
    {
      name: DEFAULT_SHEET_NAME,
      sheetId,
    },
    ...config.platforms.map((platform) => ({
      name: platform,
      sheetId: PLATFORM_SHEET_ID_MAP[platform],
    })),
  ];

  if (additionalSheet) {
    items.push({name: 'app', sheetId: additionalSheet});
  }

  const importPromises = items.map(async ({name, sheetId}) => {
    debug(`Importing translations sheet "${chalk.green(name)}"`);

    if (args.dryRun) {
      return;
    }

    return importTranslations({
      config: {
        documentId,
        languageKey: 'lang',
        outputDir: getRelativePath([tmpDir, name], context),
        sheetId: String(sheetId),
      },
      debug: debug.extend(`import:${name}`),
      verbosity: args.verbose,
    });
  });

  await executePromises(args, importPromises);

  debug('Merging translations...');

  const languages = (await fs.promises.readdir(resolvePath([tmpDir, DEFAULT_SHEET_NAME], context)))
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace('.json', ''));

  const mergeTranslations = languages.map(async (language) => {
    if (isVerbose(context)) {
      debug(`Merging translations for language "${chalk.cyan(language)}"`);
    }

    const translations = items.reduce((acc, {name}) => {
      const filePath = resolvePath([config.tmpDir, 'translations', name, `${language}.json`], context);

      if (isVeryVerbose(context)) {
        debug(`Merging translations from "${chalk.yellow(name)}" into "${chalk.cyan(language)}"`);
      }

      return {...acc, ...parseJsonFile(filePath)};
    }, {});

    await writeFile(
      [resolvedOutDir, `${language}.json`],
      JSON.stringify(translations, null, config.jsonSpaces),
      context,
    );
  });

  await executePromises(args, mergeTranslations);

  await rmDir(tmpDir, context);
};

export default translations;
