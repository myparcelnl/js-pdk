import {type ParsedEntry, type UpgradeSubContextWithLockfile} from '../types';
import {executeCommand} from '../../../utils/executeCommand';

export async function getPackageEntriesForYarn(
  context: UpgradeSubContextWithLockfile,
  resolvedPackageName: string,
): Promise<ParsedEntry[]> {
  const {config} = context;

  const content = await executeCommand(
    context,
    config.nodePackageManagerCommand,
    ['info', '--all', '--name-only', '--json'],
    {stdio: 'pipe'},
  );

  return content
    .split('\n')
    .map((line) => line.replace(/^"(.*)"$/, '$1'))
    .filter((line) => new RegExp(`^${resolvedPackageName}@npm:`).exec(line))
    .map((line) => {
      const [name, version] = line.split('@npm:');

      return {name, version};
    });
}
