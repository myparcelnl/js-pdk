import {ComponentTest, mount, runCommonComponentTests} from '../common';
import {expect, it} from 'vitest';

const DEFAULT_OPTIONS = {
  props: {
    notification: {
      variant: 'error',
      content: 'This is a plain string',
    },
  },
};

export const runPdkAlertTest: ComponentTest = (component) => {
  runCommonComponentTests(component, DEFAULT_OPTIONS);

  it('renders notification with string content', () => {
    const wrapper = mount(component, DEFAULT_OPTIONS);

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
