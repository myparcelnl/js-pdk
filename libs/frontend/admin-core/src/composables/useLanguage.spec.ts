// @vitest-environment happy-dom

import {type SpyInstance, afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi} from 'vitest';
import {setActivePinia} from 'pinia';
import {mount} from '@vue/test-utils';
import {createTestingPinia} from '@pinia/testing';
import {doComponentTestSetup, doComponentTestTeardown} from '@myparcel-pdk/admin-component-tests';
import {useQueryStore} from '../stores';
import {useLanguage} from './useLanguage';

let consoleSpy: SpyInstance;

const commonSetup = () => {
  useQueryStore().registerContextQueries();

  return useLanguage();
};

describe('useLanguage', () => {
  beforeAll(() => doComponentTestSetup());

  beforeEach(() => {
    consoleSpy = vi.spyOn(console, 'warn');

    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false,
      }),
    );
  });

  afterEach(() => {
    consoleSpy.mockClear();
  });

  afterAll(() => doComponentTestTeardown());

  describe('translate', () => {
    it('translates strings', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ translate("my_translation") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('My translation');
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('warns about missing translations', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ translate("missing") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('missing');
      expect(consoleSpy).toHaveBeenCalledWith('Missing translation for key: missing');
    });

    it('translates strings with replacements', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ translate("my_translation_with_replacement") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('My translation with replacement: http://localhost:3000');
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });

  describe('has', () => {
    it('returns true for existing translations', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ has("my_translation") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('true');
      expect(consoleSpy).not.toHaveBeenCalled();
    });

    it('returns false for missing translations', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ has("missing") }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('false');
      expect(consoleSpy).not.toHaveBeenCalled();
    });
  });
});
