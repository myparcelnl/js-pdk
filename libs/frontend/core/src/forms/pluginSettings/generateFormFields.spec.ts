import {describe, expect, it, vi} from 'vitest';
import {InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {Plugin} from '@myparcel-pdk/common';
import {generateFormFields} from './generateFormFields';

vi.mock('../composables', () => ({
  useContextStore: () => ({
    context: {
      pluginSettingsView: {
        'plugin-settings': {
          title: 'Plugin settings',
          fields: [
            {
              name: 'pluginSetting',
              component: 'Input',
              label: 'Plugin setting',
            },
          ],
        },
      },
    },
  }),
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeRef: any = (field: InteractiveElementConfiguration) => {
  const {ref, ...rest} = field;
  return rest;
};

describe('generateFieldsFromView', () => {
  it('should generate fields from a views', () => {
    const view: Plugin.SettingsView = {
      title: 'general_settings',
      description: 'general_settings_description',
      fields: [
        {
          name: 'generalSettings.name',
          label: 'general_settings_name',
          $component: 'TextInput',
        },
        {
          name: 'generalSettings.description',
          label: 'general_settings_description',
          $component: 'TextInput',
        },
      ],
    };

    const fields = generateFormFields({fields: view.fields, values: {}});

    expect(fields.map(removeRef)).toEqual([
      {
        component: 'PdkTextInput',
        label: 'general_settings_name',
        name: 'generalSettings.name',
        props: {},
      },
      {
        component: 'PdkTextInput',
        label: 'general_settings_description',
        name: 'generalSettings.description',
        props: {},
      },
    ]);
  });
});
