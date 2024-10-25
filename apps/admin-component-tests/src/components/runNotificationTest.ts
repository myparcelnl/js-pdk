import {expect, it} from 'vitest';
import {mount} from '@vue/test-utils';
import {AdminComponent} from '@myparcel-pdk/admin';
import {type AdminComponentTest} from '../tests/testMap';
import {TestSuite} from '../TestSuite';

export const runNotificationTest = ((component) => {
  const suite = new TestSuite(AdminComponent.Notification, component);

  const options = suite.setOptions({
    props: {
      notification: {
        variant: 'error',
        content: 'This is a plain string',
      },
    },
  });

  suite.runCommonComponentTests();

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
}) satisfies AdminComponentTest;
