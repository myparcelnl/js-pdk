/**
 * todo: rename this file to bundlewatch.config.cjs
 *  https://github.com/bundlewatch/bundlewatch/pull/460
 */

const {spawnSync} = require('child_process');

const packages = spawnSync('yarn', ['workspaces', 'list', '--json', '--no-private'], {encoding: 'utf8'})
  .stdout.split('\n')
  .filter(Boolean)
  .map((line) => JSON.parse(line));

module.exports = {
  ci: {
    trackBranches: ['main', 'alpha', 'beta'],
  },
  files: packages.map((pkg) => ({
    path: `${pkg.location}/dist/**/*.js`,
  })),
};
