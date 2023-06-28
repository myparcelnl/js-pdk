import {describe, expect, it} from 'vitest';
import {AdminComponent, type Plugin} from '@myparcel-pdk/common';
import {type InteractiveElementConfiguration} from '@myparcel/vue-form-builder';
import {generateFormFields} from './generateFormFields';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const removeRef: any = (field: InteractiveElementConfiguration) => {
  const {ref, ...rest} = field;
  return rest;
};

describe('generateFormFields', () => {
  it('should generate fields from a view', () => {
    const view: Plugin.SettingsView = {
      id: 'general_settings',
      title: 'general_settings',
      description: 'general_settings_description',
      children: [],
      elements: [
        {
          name: 'generalSettings.name',
          label: 'general_settings_name',
          $component: AdminComponent.TextInput,
        },
        {
          name: 'generalSettings.description',
          label: 'general_settings_description',
          $component: AdminComponent.TextInput,
        },
      ],
    };

    const fields = generateFormFields({fields: view.elements, values: {}});
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
