import {describe, expect, it, vi, beforeEach} from 'vitest';

// Use vi.hoisted to ensure mocks are available during hoisting
const {mockFieldsEqual, mockSetFieldValue, mockGetAddressFieldValue, mockGetAddressFields, mockGetFullStreet, mockTriggerFormChange, mockUseCheckoutStore, mockUseUtil} = vi.hoisted(() => {
  return {
    mockFieldsEqual: vi.fn(),
    mockSetFieldValue: vi.fn(),
    mockGetAddressFieldValue: vi.fn(),
    mockGetAddressFields: vi.fn(),
    mockGetFullStreet: vi.fn(),
    mockTriggerFormChange: vi.fn(),
    mockUseCheckoutStore: vi.fn(),
    mockUseUtil: vi.fn(),
  };
});

vi.mock('@myparcel-dev/pdk-checkout-common', () => ({
  AddressField: {Address1: 'address1', Street: 'street', Number: 'number'},
  PdkUtil: {
    FieldsEqual: 'fieldsEqual',
    SetFieldValue: 'setFieldValue',
    GetAddressFieldValue: 'getAddressFieldValue',
  },
  useCheckoutStore: mockUseCheckoutStore,
  useUtil: mockUseUtil,
}));

vi.mock('../utils', () => ({
  getAddressFields: mockGetAddressFields,
  getFullStreet: mockGetFullStreet,
  triggerFormChange: mockTriggerFormChange,
}));

vi.mock('../constants', () => ({
  SEPARATE_ADDRESS_FIELDS: ['street', 'number'],
}));

// Import after mocks are set up
import {synchronizeAddress1} from '../listeners/synchronizeAddress1';

describe('synchronizeAddress1', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    mockUseUtil.mockImplementation((token: string) => {
      if (token === 'fieldsEqual') return mockFieldsEqual;
      if (token === 'setFieldValue') return mockSetFieldValue;
      if (token === 'getAddressFieldValue') return mockGetAddressFieldValue;
      return vi.fn();
    });

    mockUseCheckoutStore.mockReturnValue({
      state: {addressTypes: ['shipping']},
    });
  });

  it('exports the function', () => {
    expect(synchronizeAddress1).toBeDefined();
  });

  it('does nothing when no fields have changed', () => {
    mockFieldsEqual.mockReturnValue(true);

    const newState = {form: {}};
    const oldState = {form: {}};

    synchronizeAddress1(newState as any, oldState as any);

    expect(mockSetFieldValue).not.toHaveBeenCalled();
    expect(mockTriggerFormChange).not.toHaveBeenCalled();
  });

  it('prevents writing address1 when value matches new address', () => {
    mockFieldsEqual.mockReturnValue(false);
    mockGetAddressFields.mockReturnValue({street: 'Test', number: '1'});
    mockGetFullStreet.mockReturnValue('Test 1');

    const newState = {form: {}};
    const oldState = {form: {}};

    // Case 1: Values differ -> Should write
    mockGetAddressFieldValue.mockReturnValue('Old Address');
    synchronizeAddress1(newState as any, oldState as any);
    expect(mockSetFieldValue).toHaveBeenCalledTimes(1);

    // Case 2: Values are equal -> Should NOT write
    mockGetAddressFieldValue.mockReturnValue('Test 1'); // Simulate update
    synchronizeAddress1(newState as any, oldState as any);
    expect(mockSetFieldValue).toHaveBeenCalledTimes(1); // Still 1 (no new call)
  });


  it('does not write when address1 is empty and fields are incomplete', () => {
    mockFieldsEqual.mockReturnValue(false);
    mockGetAddressFieldValue.mockReturnValue(''); // empty address1
    mockGetAddressFields.mockReturnValue({street: '', number: '1'}); // missing street

    const newState = {form: {}};
    const oldState = {form: {}};

    synchronizeAddress1(newState as any, oldState as any);

    expect(mockSetFieldValue).not.toHaveBeenCalled();
  });
});
