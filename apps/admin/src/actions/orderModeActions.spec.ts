import {describe, expect, it} from 'vitest';
import {AdminAction, OrderMode} from '../data';
import {
  BOX_MODE_ACTIONS,
  MODAL_MODE_ACTIONS,
  ORDER_VIEW_IN_BACKOFFICE_ID,
  STORE_MODE_ACTIONS,
} from './orderModeActions';

const getDefinitionIds = (actions: {name?: string; id?: string}[]): string[] =>
  actions.map((a) => a.name ?? a.id ?? '');

describe('orderModeActions', () => {
  describe('all mappings cover every OrderMode', () => {
    const allModes = Object.values(OrderMode);

    it.each([
      {name: 'STORE_MODE_ACTIONS', mapping: STORE_MODE_ACTIONS},
      {name: 'BOX_MODE_ACTIONS', mapping: BOX_MODE_ACTIONS},
      {name: 'MODAL_MODE_ACTIONS', mapping: MODAL_MODE_ACTIONS},
    ])('$name has an entry for every OrderMode', ({mapping}) => {
      expect(Object.keys(mapping)).toEqual(expect.arrayContaining(allModes));
    });
  });

  describe('STORE_MODE_ACTIONS', () => {
    it('registers export and backoffice actions for OrderV1', () => {
      const ids = getDefinitionIds(STORE_MODE_ACTIONS[OrderMode.OrderV1]);

      expect(ids).toContain(AdminAction.OrdersExport);
      expect(ids).toContain(ORDER_VIEW_IN_BACKOFFICE_ID);
    });

    it('registers all shipment actions for Shipments mode', () => {
      const ids = getDefinitionIds(STORE_MODE_ACTIONS[OrderMode.Shipments]);

      expect(ids).toContain(AdminAction.OrdersPrint);
      expect(ids).toContain(AdminAction.OrdersExport);
      expect(ids).toContain(AdminAction.OrdersExportPrint);
      expect(ids).toContain(AdminAction.ShipmentsExportReturn);
      expect(ids).toContain(AdminAction.ShipmentsDelete);
      expect(ids).toContain(AdminAction.ShipmentsUpdate);
      expect(ids).toContain(AdminAction.ShipmentsPrint);
    });

    it('registers no additional actions for OrderV2', () => {
      expect(STORE_MODE_ACTIONS[OrderMode.OrderV2]).toHaveLength(0);
    });
  });

  describe('BOX_MODE_ACTIONS', () => {
    it('includes export for OrderV1', () => {
      const ids = getDefinitionIds(BOX_MODE_ACTIONS[OrderMode.OrderV1]);

      expect(ids).toEqual([AdminAction.OrdersExport]);
    });

    it('includes export-to-shipments, print, and export-print for Shipments', () => {
      const ids = getDefinitionIds(BOX_MODE_ACTIONS[OrderMode.Shipments]);

      expect(ids).toContain(AdminAction.OrdersExport);
      expect(ids).toContain(AdminAction.OrdersPrint);
      expect(ids).toContain(AdminAction.OrdersExportPrint);
    });

    it('has no actions for OrderV2', () => {
      expect(BOX_MODE_ACTIONS[OrderMode.OrderV2]).toHaveLength(0);
    });
  });

  describe('MODAL_MODE_ACTIONS', () => {
    it('includes export for OrderV1', () => {
      const ids = getDefinitionIds(MODAL_MODE_ACTIONS[OrderMode.OrderV1]);

      expect(ids).toEqual([AdminAction.OrdersExport]);
    });

    it('includes export-to-shipments and export-print for Shipments (no standalone print)', () => {
      const ids = getDefinitionIds(MODAL_MODE_ACTIONS[OrderMode.Shipments]);

      expect(ids).toContain(AdminAction.OrdersExport);
      expect(ids).toContain(AdminAction.OrdersExportPrint);
      expect(ids).not.toContain(AdminAction.OrdersPrint);
    });

    it('has no actions for OrderV2', () => {
      expect(MODAL_MODE_ACTIONS[OrderMode.OrderV2]).toHaveLength(0);
    });
  });

  describe('consistency between mappings', () => {
    it('BOX actions are a subset of STORE actions for each mode', () => {
      for (const mode of Object.values(OrderMode)) {
        const storeIds = getDefinitionIds(STORE_MODE_ACTIONS[mode]);
        const boxIds = getDefinitionIds(BOX_MODE_ACTIONS[mode]);

        for (const id of boxIds) {
          expect(storeIds, `BOX action ${id} in ${mode} mode should also be in STORE`).toContain(id);
        }
      }
    });

    it('MODAL actions are a subset of STORE actions for each mode', () => {
      for (const mode of Object.values(OrderMode)) {
        const storeIds = getDefinitionIds(STORE_MODE_ACTIONS[mode]);
        const modalIds = getDefinitionIds(MODAL_MODE_ACTIONS[mode]);

        for (const id of modalIds) {
          expect(storeIds, `MODAL action ${id} in ${mode} mode should also be in STORE`).toContain(id);
        }
      }
    });
  });
});
