import {describe, expect, it, vi} from 'vitest';
import {useDateFormatter} from './formatDate';

describe('format date', () => {
  const now = new Date('2022-12-05T12:00:00.000Z');

  it.each([
    {
      date: new Date('2022-11-05T12:00:00.000Z'),
      expectation: 'Sat, 5 Nov 2022',
    },
    {
      date: new Date('2022-11-28T12:00:00.000Z'),
      expectation: '7 days ago',
    },
    {
      date: new Date('2022-12-01T12:00:00.000Z'),
      expectation: '4 days ago',
    },
    {
      date: new Date('2022-12-04T12:00:00.000Z'),
      expectation: 'yesterday',
    },
    {
      date: new Date('2022-12-05T09:00:00.000Z'),
      expectation: '3 hours ago',
    },
    {
      date: new Date('2022-12-05T11:44:00.000Z'),
      expectation: '16 minutes ago',
    },
    {
      date: new Date('2022-12-05T11:58:00.000Z'),
      expectation: '2 minutes ago',
    },
    {
      date: new Date('2022-12-05T11:59:29.000Z'),
      expectation: '1 minute ago',
    },
    {
      date: new Date('2022-12-05T11:59:30.000Z'),
      expectation: 'time_seconds_past',
    },
    {
      date: new Date('2022-12-05T12:00:00.001Z'),
      expectation: 'time_seconds_future',
    },
    {
      date: new Date('2022-12-05T12:01:00.000Z'),
      expectation: 'in 1 minute',
    },
    {
      date: new Date('2022-12-05T12:30:00.000Z'),
      expectation: 'in 30 minutes',
    },
    {
      date: new Date('2022-12-05T13:00:00.000Z'),
      expectation: 'in 1 hour',
    },
    {
      date: new Date('2022-12-11T12:00:00.000Z'),
      expectation: 'in 6 days',
    },
    {
      date: new Date('2022-12-12T12:00:00.000Z'),
      expectation: 'in 7 days',
    },
    {
      date: new Date('2022-12-19T12:00:00.000Z'),
      expectation: 'Mon, 19 Dec 2022',
    },
  ])("formats date relative to '$date' as $expectation", ({date, expectation}) => {
    const dateSpy = vi.spyOn(global.Date, 'now');
    dateSpy.mockImplementation(() => now.getTime());

    const formatter = useDateFormatter('en-GB');
    const result = formatter.formatRelative(date);

    expect(result).toEqual(expectation);

    dateSpy.mockRestore();
  });

  it('formats date', () => {
    const formatter = useDateFormatter('en-GB');
    const result = formatter.formatLong(now);

    expect(result).toEqual('Mon, 5 Dec 2022');
  });
});
