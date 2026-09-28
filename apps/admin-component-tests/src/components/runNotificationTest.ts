import {expect, it, vi} from 'vitest';
import {mount} from '@vue/test-utils';
import {AdminComponent} from '@myparcel-dev/pdk-admin';
import {type AdminComponentTest} from '../tests';
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

  it('renders a button that runs the notification action', async () => {
    const onClick = vi.fn();
    const wrapper = mount(component, {
      props: {
        notification: {
          variant: 'success',
          content: 'Labels are ready',
          action: {label: 'Open labels', onClick},
        },
      },
    });

    const button = wrapper.find('button');

    expect(button.text()).toBe('Open labels');

    await button.trigger('click');

    expect(onClick).toHaveBeenCalledOnce();
  });

  it('marks a loading notification as busy', () => {
    const wrapper = mount(component, {
      props: {
        notification: {
          variant: 'info',
          content: 'Preparing labels',
          loading: true,
        },
      },
    });

    expect(wrapper.find('[aria-busy="true"]').exists()).toBe(true);
  });
}) satisfies AdminComponentTest;
