/* eslint-disable max-lines-per-function,@typescript-eslint/no-magic-numbers */
import fs from 'fs';
import chalk from 'chalk';
import {importTranslations} from '@edielemoine/google-docs-importer';
import {executePromises, reportDryRun} from '../utils';
import {type PdkBuilderCommand} from '../types';
import {PLATFORM_SHEET_ID_MAP, VerbosityLevel} from '../constants';

interface SheetDefinition {
  name: string;
  sheetId: number;
}

const translations: PdkBuilderCommand = async ({config, args, debug}) => {
  const {documentId, outDir, additionalSheet, sheetId} = config.translations;

  const items: SheetDefinition[] = [
    {
      name: 'default',
      sheetId,
    },
    ...config.platforms.map((platform) => ({
      name: platform,
      sheetId: PLATFORM_SHEET_ID_MAP[platform],
    })),
  ];

  if (additionalSheet) {
    items.push({
      name: 'app',
      sheetId: additionalSheet,
    });
  }

  const promises = items.map(async ({name, sheetId}) => {
    debug(`Importing translations sheet "${chalk.green(name)}"`);

    if (args.dryRun) {
      reportDryRun(debug, `Translations sheet "${chalk.green(name)}" will be imported.`);
      return;
    }

    return importTranslations({
      config: {
        documentId,
        languageKey: 'lang',
        outputDir: `${outDir}/.tmp/${name}`,
        sheetId: String(sheetId),
      },
      debug: debug.extend(`import:${name}`),
      verbosity: args.verbose,
    });
  });

  await executePromises(args, promises);

  debug('Merging translations...');

  const languages = (await fs.promises.readdir(`${outDir}/.tmp/default`))
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace('.json', ''));

  await executePromises(
    args,
    languages.map(async (language) => {
      if (args.verbose >= VerbosityLevel.Verbose) {
        debug(`Merging translations for language "${chalk.cyan(language)}"`);
      }

      const translations = items.reduce((acc, {name}) => {
        const filePath = `${outDir}/.tmp/${name}/${language}.json`;
        const json = fs.readFileSync(filePath, 'utf8');
        const parsed = JSON.parse(json);

        if (args.verbose >= VerbosityLevel.VeryVeryVerbose) {
          debug(`Merging translations from "${chalk.yellow(name)}" into "${chalk.cyan(language)}"`);
        }

        return {
          ...acc,
          ...parsed,
        };
      }, {});

      if (args.verbose >= VerbosityLevel.VeryVeryVerbose) {
        debug(`Writing merged translations for language "${chalk.cyan(language)}"`);
      }

      if (!args.dryRun) {
        await fs.promises.writeFile(
          `${outDir}/${language}.json`,
          JSON.stringify(translations, null, config.jsonSpaces),
        );
      }
    }),
  );

  if (args.verbose >= VerbosityLevel.VeryVeryVerbose) {
    debug('Removing temporary files');
  }

  if (!args.dryRun) {
    await fs.promises.rm(`${outDir}/.tmp`, {recursive: true});
  }
};

export default translations;
