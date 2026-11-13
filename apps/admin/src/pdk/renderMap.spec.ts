import {describe, expect, it, vi} from 'vitest';
import {AdminView} from '../data';
import {renderViewComponent} from './renderMap';

vi.mock('../views/DeactivationFeedback.vue', () => ({default: {name: 'DeactivationFeedback'}}));

describe('renderViewComponent', () => {
  it('renders the deactivation feedback view', async () => {
    await expect(renderViewComponent(AdminView.DeactivationFeedback)).resolves.toEqual({name: 'DeactivationFeedback'});
  });

  it('throws for an unknown view', async () => {
    await expect(renderViewComponent('Unknown' as AdminView)).rejects.toThrow('No render method found');
  });
});
