import {defineComponent, h} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {AdminView} from '../data';
import {setupAdminApp} from './setupAdminApp';
import {createAdminConfig} from './createAdminConfig';
import {PdkAdmin} from './PdkAdmin';

vi.mock('./renderMap', () => ({
  renderViewComponent: vi.fn(() => Promise.resolve(defineComponent({render: () => h('p', 'rendered')}))),
}));

vi.mock('./setupAdminApp', () => ({setupAdminApp: vi.fn()}));

const createPdkAdmin = (): PdkAdmin => new PdkAdmin(createAdminConfig({components: {}} as never), {} as never);

describe('PdkAdmin.render', () => {
  afterEach(() => {
    document.body.innerHTML = '';
  });

  it('returns the mounted app, so the caller can unmount it', async () => {
    document.body.innerHTML = '<div id="target"></div>';

    const app = await createPdkAdmin().render(AdminView.PluginSettings, '#target');

    expect(document.querySelector('#target')?.textContent).toBe('rendered');

    app?.unmount();

    expect(document.querySelector('#target')?.textContent).toBe('');
  });

  it('returns undefined when the element does not exist', async () => {
    const app = await createPdkAdmin().render(AdminView.PluginSettings, '#missing');

    expect(app).toBeUndefined();
  });

  it('shares one store and query client between the apps of one instance', async () => {
    document.body.innerHTML = '<div id="one"></div><div id="two"></div>';
    vi.mocked(setupAdminApp).mockClear();
    const pdkAdmin = createPdkAdmin();

    await pdkAdmin.render(AdminView.PluginSettings, '#one');
    await pdkAdmin.render(AdminView.PluginSettings, '#two');

    const [first, second] = vi.mocked(setupAdminApp).mock.calls.map(([, appConfig]) => appConfig);

    expect(first.store).toBeDefined();
    expect(first.queryClient).toBeDefined();
    expect(second.store).toBe(first.store);
    expect(second.queryClient).toBe(first.queryClient);
  });

  it('gives a new instance its own store and query client, so a second visit starts clean', async () => {
    document.body.innerHTML = '<div id="one"></div><div id="two"></div>';
    vi.mocked(setupAdminApp).mockClear();

    await createPdkAdmin().render(AdminView.PluginSettings, '#one');
    await createPdkAdmin().render(AdminView.PluginSettings, '#two');

    const [first, second] = vi.mocked(setupAdminApp).mock.calls.map(([, appConfig]) => appConfig);

    expect(second.store).not.toBe(first.store);
    expect(second.queryClient).not.toBe(first.queryClient);
  });
});
