import {defineComponent, h} from 'vue';
import {afterEach, describe, expect, it, vi} from 'vitest';
import {AdminView} from '../data';
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
});
