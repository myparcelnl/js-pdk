// @vitest-environment happy-dom

import {afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, type MockInstance, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {AdminComponent} from '@myparcel-dev/pdk-admin-component-tests';
import {useQueryStore} from '../../stores';
import {globalLogger} from '../../services';
import {doComponentTestSetup, doComponentTestTeardown, mockDefaultTranslations} from '../../__tests__';
import DefaultBox from '../../../../admin-preset-default/src/components/DefaultBox.vue';
import {useLanguage} from './useLanguage';

let warnSpy: MockInstance;

const commonSetup = () => {
  useQueryStore().registerContextQueries();

  return useLanguage();
};

describe('useLanguage', () => {
  beforeAll(() => {
    mockDefaultTranslations.mockReturnValue({
      my_translation: 'My translation',
      my_translation_with_replacement: 'My translation with replacement: {platform.backofficeUrl}',
      translation_with_custom_replacer: '{platform.name} said {word}',
    });
  });

  beforeEach(() => {
    doComponentTestSetup({
      [AdminComponent.Box]: DefaultBox,
    });

    warnSpy = vi.spyOn(globalLogger, 'warn');
  });

  afterEach(() => {
    warnSpy.mockClear();
    doComponentTestTeardown();
  });

  afterAll(() => {
    mockDefaultTranslations.mockReset();
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

    it('handles non-translatables', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ translate({text: "plain text"}) }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('plain text');
    });

    it('translates translatables', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ translate({key: "translation_with_custom_replacer", args: {word: "wow" } }) }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('test said wow');
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

    it('returns true for non-translatables', () => {
      const wrapper = mount({
        setup: commonSetup,
        template: '<div>{{ has({text: "plain text"}) }}</div>',
      });

      expect(wrapper.find('div').element.innerText).toBe('true');
    });
  });
});
