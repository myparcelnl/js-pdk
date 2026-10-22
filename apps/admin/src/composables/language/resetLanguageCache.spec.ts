// @vitest-environment happy-dom

import {describe, expect, it, vi} from 'vitest';
import {useGlobalContext} from '../context';
import {resetLanguageCache, useLanguage} from './useLanguage';

vi.mock('../context', () => ({useGlobalContext: vi.fn()}));

const useTranslations = (translations: Record<string, string>) => {
  vi.mocked(useGlobalContext).mockReturnValue({translations} as never);
};

describe('resetLanguageCache', () => {
  it('translates with the translations of the next admin instance after a reset', () => {
    useTranslations({settings_title: 'Settings'});
    expect(useLanguage().translate('settings_title')).toBe('Settings');

    useTranslations({settings_title: 'Einstellungen'});
    resetLanguageCache();

    expect(useLanguage().translate('settings_title')).toBe('Einstellungen');
    expect(useLanguage().has('settings_title')).toBe(true);
  });
});
