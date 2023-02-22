import child_process from 'child_process';

export const spawnPromise = (command: string, args: string[], options: child_process.SpawnOptions): Promise<void> => {
  return new Promise((resolve, reject) => {
    const child = child_process.spawn(command, args, options);

    child.on('error', reject);
    child.on('close', resolve);
  });
};
