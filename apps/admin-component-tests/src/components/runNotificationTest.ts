import {expect, it} from 'vitest';
import {type ComponentMountingOptions, mount} from '@vue/test-utils';
import {type AdminComponentTest} from '../tests';
import {runCommonComponentTests} from '../common';

export const runNotificationTest: AdminComponentTest = (component) => {
  const options: ComponentMountingOptions<any> = {
    props: {
      notification: {
        variant: 'error',
        content: 'This is a plain string',
      },
    },
  };

  runCommonComponentTests(component, options);

  it('renders notification with string content', () => {
    const wrapper = mount(component, options);

    expect(wrapper.findAll('*').map((wrapper) => wrapper.text())).toContain('This is a plain string');
  });

  it('renders notification with array content', () => {
    const wrapper = mount(component, {
      props: {
        notification: {
          variant: 'error',
          content: ['This is a notification', 'With multiple strings'],
        },
      },
    });

    expect(wrapper.findAll('*').map((wrapper) => wrapper.text())).toContain('This is a notification');
    expect(wrapper.findAll('*').map((wrapper) => wrapper.text())).toContain('With multiple strings');
  });
};
