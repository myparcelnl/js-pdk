import {describe, expect, it} from 'vitest';
import {type Plugin} from '@myparcel-dev/pdk-common';
import {OrderMode} from '../../data';
import {filterPluginSettingsView} from './filterPluginSettingsView';

const createField = (name: string, component = 'ToggleInput'): Plugin.Field => ({
  name,
  $component: component,
  label: `label_${name}`,
});

const createDivider = (heading: string): Plugin.Field =>
  ({
    $component: 'SettingsDivider',
    $wrapper: false,
    level: 2,
    heading,
    content: `${heading}_description`,
  } as Plugin.Field);

const createSettingsView = (overrides: Partial<Plugin.SettingsView> = {}): Plugin.SettingsView => ({
  id: 'test',
  title: 'test',
  elements: null,
  children: null,
  ...overrides,
});

const createOrderView = (): Plugin.SettingsView =>
  createSettingsView({
    id: 'order',
    title: 'settings_order_title',
    elements: [
      createDivider('settings_order_general_title'),
      createField('conceptShipments'),
      createField('processDirectly', 'SelectInput'),
      createField('sendReturnEmail'),
      createField('saveCustomerAddress'),
      createField('shareCustomerInformation'),
      createDivider('settings_order_status_title'),
      createField('statusOnLabelCreate', 'SelectInput'),
      createField('statusWhenLabelScanned', 'SelectInput'),
      createDivider('settings_order_track_trace_title'),
      createField('trackTraceInEmail'),
      createField('trackTraceInAccount'),
    ],
  });

const createFullView = (): Plugin.ModelContextPluginSettingsViewContext =>
  ({
    order: createOrderView(),
    label: createSettingsView({id: 'label', title: 'Labels'}),
    customs: createSettingsView({id: 'customs', title: 'Customs'}),
    checkout: createSettingsView({id: 'checkout', title: 'Checkout'}),
    carrier: createSettingsView({id: 'carrier', title: 'Carriers'}),
  } as Plugin.ModelContextPluginSettingsViewContext);

const getFieldNames = (elements: Plugin.Field[] | null): string[] =>
  (elements ?? []).filter((el) => el.name).map((el) => el.name!);

const getTabIds = (view: Plugin.ModelContextPluginSettingsViewContext): string[] => Object.keys(view);

describe('filterPluginSettingsView', () => {
  describe('Shipments mode', () => {
    it('keeps all General section fields visible', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.Shipments);
      const fieldNames = getFieldNames(result.order.elements);

      expect(fieldNames).toContain('conceptShipments');
      expect(fieldNames).toContain('saveCustomerAddress');
      expect(fieldNames).toContain('processDirectly');
      expect(fieldNames).toContain('sendReturnEmail');
      expect(fieldNames).toContain('shareCustomerInformation');
    });

    it('keeps all tabs visible', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.Shipments);

      expect(getTabIds(result)).toEqual(['order', 'label', 'customs', 'checkout', 'carrier']);
    });
  });

  describe('OrderV1 mode', () => {
    it('hides conceptShipments and saveCustomerAddress', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.OrderV1);
      const fieldNames = getFieldNames(result.order.elements);

      expect(fieldNames).not.toContain('conceptShipments');
      expect(fieldNames).not.toContain('saveCustomerAddress');
    });

    it('keeps other General section fields visible', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.OrderV1);
      const fieldNames = getFieldNames(result.order.elements);

      expect(fieldNames).toContain('processDirectly');
      expect(fieldNames).toContain('sendReturnEmail');
      expect(fieldNames).toContain('shareCustomerInformation');
    });

    it('keeps all tabs visible', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.OrderV1);

      expect(getTabIds(result)).toEqual(['order', 'label', 'customs', 'checkout', 'carrier']);
    });
  });

  describe('OrderV2 mode', () => {
    it('removes the entire General section including its divider', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.OrderV2);
      const elements = result.order.elements ?? [];

      const hasGeneralDivider = elements.some(
        (el) => (el as Record<string, unknown>).heading === 'settings_order_general_title',
      );

      expect(hasGeneralDivider).toBe(false);

      expect(getFieldNames(elements)).not.toContain('conceptShipments');
      expect(getFieldNames(elements)).not.toContain('saveCustomerAddress');
      expect(getFieldNames(elements)).not.toContain('processDirectly');
      expect(getFieldNames(elements)).not.toContain('sendReturnEmail');
      expect(getFieldNames(elements)).not.toContain('shareCustomerInformation');
    });

    it('hides the label tab', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.OrderV2);

      expect(getTabIds(result)).not.toContain('label');
    });

    it('hides the customs tab', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.OrderV2);

      expect(getTabIds(result)).not.toContain('customs');
    });

    it('keeps checkout and carrier tabs visible', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.OrderV2);

      expect(getTabIds(result)).toContain('checkout');
      expect(getTabIds(result)).toContain('carrier');
    });

    it('keeps non-General sections in the order tab', () => {
      const result = filterPluginSettingsView(createFullView(), OrderMode.OrderV2);
      const fieldNames = getFieldNames(result.order.elements);

      expect(fieldNames).toContain('statusOnLabelCreate');
      expect(fieldNames).toContain('statusWhenLabelScanned');
      expect(fieldNames).toContain('trackTraceInEmail');
      expect(fieldNames).toContain('trackTraceInAccount');
    });
  });

  it('does not mutate the input view', () => {
    const view = createFullView();
    const originalOrderElements = [...(view.order.elements ?? [])];
    const originalTabIds = Object.keys(view);

    filterPluginSettingsView(view, OrderMode.OrderV2);

    expect(Object.keys(view)).toEqual(originalTabIds);
    expect(view.order.elements).toEqual(originalOrderElements);
  });
});
