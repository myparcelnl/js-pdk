const branch = require('child_process').execSync('git rev-parse --abbrev-ref HEAD').toString().trim();

const prereleaseBranches = ['next', 'alpha', 'beta', 'rc'];

/**
 * @type {import('@monoweave/types').MonoweaveConfiguration}
 */
module.exports = {
  autoCommitMessage: 'chore: release [skip ci]',
  changelogFilename: '<packageDir>/CHANGELOG.md',
  conventionalChangelogConfig: 'conventional-changelog-conventionalcommits',
  persistVersions: true,
  plugins: ['@monoweave/plugin-github', '@edielemoine/monodeploy-plugin-github-actions'],
  prerelease: prereleaseBranches.includes(branch),
  prereleaseId: branch,
  prereleaseNPMTag: branch,
  preset: 'monoweave/preset-recommended',
  registryUrl: 'https://registry.npmjs.org',
};
