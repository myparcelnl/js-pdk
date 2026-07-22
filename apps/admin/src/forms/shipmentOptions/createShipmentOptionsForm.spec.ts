import {beforeEach, describe, expect, it, vi} from 'vitest';
import {useContext} from '../../composables';
import {FIELD_SHIPMENT_OPTIONS_PREFIX} from './field';
import {createShipmentOptionsForm} from './createShipmentOptionsForm';

vi.mock('../../composables', () => ({
  useAdminConfig: vi.fn(() => ({formConfigOverrides: {}})),
  useContext: vi.fn(),
}));

vi.mock('../../stores', () => ({
  useModalStore: vi.fn(() => ({opened: undefined})),
}));

vi.mock('../helpers', () => ({
  addBulkEditNotification: vi.fn(),
}));

vi.mock('../../utils', () => ({
  createShipmentFormName: vi.fn(() => 'shipment-form'),
}));

vi.mock('@myparcel-dev/vue-form-builder', () => ({
  defineForm: vi.fn((_name: string, config: {fields: unknown[]}) => config),
  MagicForm: {name: 'MagicForm', render: () => null},
}));

vi.mock('./fields', () => ({
  createDigitalStampRangeField: () => ({name: '__static_digitalStampRange'}),
  createLabelAmountField: () => ({name: '__static_labelAmount'}),
  createPackageTypeField: () => ({name: '__static_packageType'}),
}));

vi.mock('./fields/createCarrierField', () => ({
  createCarrierField: () => ({name: '__static_carrier'}),
}));

vi.mock('./fields/createDeliveryTypeField', () => ({
  createDeliveryTypeField: () => ({name: '__static_deliveryType'}),
}));

vi.mock('./fields/createShipmentOptionField', () => ({
  createShipmentOptionField: (_refs: unknown, name: string) => ({name}),
}));

vi.mock('./fieldFactoryRegistry', () => ({
  fieldFactoryRegistry: {},
}));

vi.mock('./useShipmentOptionsState', () => ({
  useShipmentOptionsState: vi.fn(),
}));

const mockedUseContext = vi.mocked(useContext);

const dynamicOptionKeys = (form: unknown): string[] => {
  const fields = (form as {fields: {name: string}[]}).fields;
  const prefix = `${FIELD_SHIPMENT_OPTIONS_PREFIX}.`;

  return fields.filter((f) => f.name.startsWith(prefix)).map((f) => f.name.slice(prefix.length));
};

describe('createShipmentOptionsForm — dynamic option fields from carrier context', () => {
  beforeEach(() => {
    mockedUseContext.mockReset();
  });

  it('creates a field for the union of option keys across carriers', () => {
    mockedUseContext.mockReturnValue({
      carriers: [
        {options: {signature: {}, insurance: {}}},
        {options: {insurance: {}, ageCheck: {}}},
      ],
    } as never);

    const form = createShipmentOptionsForm();

    expect(dynamicOptionKeys(form).sort()).toEqual(['ageCheck', 'insurance', 'signature']);
  });

  it('does not throw when a carrier has no options field', () => {
    mockedUseContext.mockReturnValue({carriers: [{}]} as never);

    expect(() => createShipmentOptionsForm()).not.toThrow();
    expect(dynamicOptionKeys(createShipmentOptionsForm())).toEqual([]);
  });

  it('does not throw when options is explicitly null', () => {
    mockedUseContext.mockReturnValue({carriers: [{options: null}]} as never);

    expect(() => createShipmentOptionsForm()).not.toThrow();
  });

  it('skips carriers without options but still collects keys from siblings', () => {
    mockedUseContext.mockReturnValue({
      carriers: [
        {options: {signature: {}}},
        {},
        {options: null},
        {options: {ageCheck: {}}},
      ],
    } as never);

    expect(dynamicOptionKeys(createShipmentOptionsForm()).sort()).toEqual(['ageCheck', 'signature']);
  });

  it('produces no dynamic option fields for an empty carrier list', () => {
    mockedUseContext.mockReturnValue({carriers: []} as never);

    expect(dynamicOptionKeys(createShipmentOptionsForm())).toEqual([]);
  });
});
