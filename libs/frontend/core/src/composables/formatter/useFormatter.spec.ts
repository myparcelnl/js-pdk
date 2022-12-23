import {describe, expect, it, vi} from 'vitest';
import {mount} from '../../__tests__/mount';
import {useFormatter} from './useFormatter';

describe('format strings', () => {
  const fakeDate = new Date('2022-12-05T12:00:00.000Z');

  it.each([
    {
      date: new Date('2022-11-05T12:00:00.000Z'),
      expectation: '5 november 2022',
    },
    {
      date: new Date('2022-11-28T12:00:00.000Z'),
      expectation: '7 dagen geleden',
    },
    {
      date: new Date('2022-12-01T12:00:00.000Z'),
      expectation: '4 dagen geleden',
    },
    {
      date: new Date('2022-12-04T12:00:00.000Z'),
      expectation: 'gisteren',
    },
    {
      date: new Date('2022-12-05T09:00:00.000Z'),
      expectation: '3 uur geleden',
    },
    {
      date: new Date('2022-12-05T11:44:00.000Z'),
      expectation: '16 minuten geleden',
    },
    {
      date: new Date('2022-12-05T11:58:00.000Z'),
      expectation: '2 minuten geleden',
    },
    {
      date: new Date('2022-12-05T11:59:29.000Z'),
      expectation: '1 minuut geleden',
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
      expectation: 'over 1 minuut',
    },
    {
      date: new Date('2022-12-05T12:30:00.000Z'),
      expectation: 'over 30 minuten',
    },
    {
      date: new Date('2022-12-05T13:00:00.000Z'),
      expectation: 'over 1 uur',
    },
    {
      date: new Date('2022-12-11T12:00:00.000Z'),
      expectation: 'over 6 dagen',
    },
    {
      date: new Date('2022-12-12T12:00:00.000Z'),
      expectation: 'over 7 dagen',
    },
    {
      date: new Date('2022-12-19T12:00:00.000Z'),
      expectation: '19 december 2022',
    },
  ])("formats date relative to '$date' as $expectation", ({date, expectation}) => {
    const dateSpy = vi.spyOn(global.Date, 'now');
    dateSpy.mockImplementation(() => fakeDate.getTime());

    const wrapper = mount({
      template: '<div></div>',
      setup: () => ({
        formatter: useFormatter('nl-NL'),
      }),
    });

    expect(wrapper.vm.formatter.format('dateRelative', date)).toBe(expectation);

    dateSpy.mockRestore();
  });

  it('formats date', () => {
    const wrapper = mount({
      template: '<div></div>',
      setup: () => ({
        formatter: useFormatter('nl-NL'),
      }),
    });

    expect(wrapper.vm.formatter.format('dateLong', fakeDate)).toBe('5 december 2022');
  });
});
