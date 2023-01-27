import {describe, it, expect} from 'vitest';
import {generateLabelFilename} from './generateLabelFilename';

describe('generating label filename', () => {
  it('generates a filename for a single order', () => {
    expect(generateLabelFilename({ orderIds: '123' })).toEqual('myparcel-labels-123');
  });

  it('generates a filename for multiple orders', () => {
    expect(generateLabelFilename({ orderIds: ['123', '456'] })).toEqual('myparcel-labels');
  });

  it('generates a filename for a single shipment', () => {
    expect(generateLabelFilename({ orderIds: '123', shipmentIds: '456' })).toEqual('myparcel-labels-123-456');
  });

  it('generates a filename for multiple shipments', () => {
    expect(generateLabelFilename({ orderIds: '123', shipmentIds: ['456', '789'] }))
      .toEqual('myparcel-labels-123-shipments');
  });

  it('generates a filename for multiple orders and shipments', () => {
    expect(generateLabelFilename({ orderIds: ['123', '456'], shipmentIds: ['789', '101'] })).toEqual('myparcel-labels');
  });
}
