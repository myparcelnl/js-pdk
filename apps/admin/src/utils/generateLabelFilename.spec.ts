import {describe, expect, it} from 'vitest';
import {generateLabelFilename} from './generateLabelFilename';

describe('generating label filename', () => {
  it('generates a filename for a single order', () => {
    expect(generateLabelFilename({orderIds: '123'})).toEqual('myparcel-labels-123.pdf');
  });

  it('generates a filename for multiple orders', () => {
    expect(generateLabelFilename({orderIds: ['123', '456']})).toEqual('myparcel-labels.pdf');
  });

  it('generates a filename for a single shipment', () => {
    expect(generateLabelFilename({orderIds: '123', shipmentIds: 456})).toEqual('myparcel-labels-123-456.pdf');
  });

  it('generates a filename for multiple shipments', () => {
    expect(generateLabelFilename({orderIds: '123', shipmentIds: [456, 789]})).toEqual('myparcel-labels-123.pdf');
  });

  it('generates a filename for multiple orders and shipments', () => {
    expect(generateLabelFilename({orderIds: ['123', '456'], shipmentIds: [789, 101]})).toEqual('myparcel-labels.pdf');
  });
});
