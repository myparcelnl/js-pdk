// @vitest-environment happy-dom

import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, type SpyInstance, vi} from 'vitest';
import {setActivePinia} from 'pinia';
import {mount} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';
import {useQueryStore} from '../stores';
import {globalLogger} from '../services';
import {doComponentTestSetup, doComponentTestTeardown, mockDefaultTranslations} from '../__tests__';
import {useLanguage} from './useLanguage';

let warnSpy: SpyInstance;

const commonSetup = () => {
  useQueryStore().registerContextQueries();

  return useLanguage();
};

describe('useLanguage', () => {
  beforeAll(() => {
    mockDefaultTranslations.mockReturnValue({
      my_translation: 'My translation',
      my_translation_with_replacement: 'My translation with replacement: {platform.backofficeUrl}',
    });

    doComponentTestSetup();
  });

  beforeEach(() => {
    warnSpy = vi.spyOn(globalLogger, 'warn');

    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      }),
    );
  });

  afterEach(() => {
    warnSpy.mockClear();
  });

  afterAll(() => {
    mockDefaultTranslations.mockReset();
    doComponentTestTeardown();
  });

  describe('translate', () => {
    it('translates strings', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ translate("my_translation") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('My translation');
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('warns about missing translations', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ translate("missing") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('missing');
      expect(warnSpy).toHaveBeenCalledWith('Missing translation: missing');
    });

    it('translates strings with replacements', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ translate("my_translation_with_replacement") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe(
        'My translation with replacement: https://backoffice.test.myparcel.nl',
      );
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });

  describe('has', () => {
    it('returns true for existing translations', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ has("my_translation") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('true');
      expect(warnSpy).not.toHaveBeenCalled();
    });

    it('returns false for missing translations', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ has("missing") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('false');
      expect(warnSpy).not.toHaveBeenCalled();
    });
  });
});
