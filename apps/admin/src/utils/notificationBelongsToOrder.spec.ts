import {describe, expect, it} from 'vitest';
import {notificationBelongsToOrder} from './notificationBelongsToOrder';

describe('notificationBelongsToOrder', () => {
  it('matches the order the notification was tagged with', () => {
    expect(notificationBelongsToOrder({tags: {orderIds: '123'}}, '123')).toBe(true);
  });

  it('matches an order inside a bulk action tag', () => {
    expect(notificationBelongsToOrder({tags: {orderIds: '123,456,789'}}, '456')).toBe(true);
  });

  it('does not match another order', () => {
    expect(notificationBelongsToOrder({tags: {orderIds: '123,456'}}, '999')).toBe(false);
  });

  it('does not match a partial order id', () => {
    expect(notificationBelongsToOrder({tags: {orderIds: '1234'}}, '123')).toBe(false);
  });

  it('does not match an untagged notification', () => {
    expect(notificationBelongsToOrder({tags: {}}, '123')).toBe(false);
  });

  it('does not match when there is no order', () => {
    expect(notificationBelongsToOrder({tags: {orderIds: '123'}}, undefined)).toBe(false);
  });
});
