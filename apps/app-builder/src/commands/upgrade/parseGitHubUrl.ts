const GITHUB_URL = 'https://github.com/';

export const parseGitHubUrl = (url: string): string => {
  const repository = url
    .replace(/\.git$/, '')
    .replace(/^git@github\.com:/, '')
    .replace(/^git\+/, '')
    .replace(/^github:/, '');

  return repository.startsWith(GITHUB_URL) ? repository : `${GITHUB_URL}${repository}/`;
};
