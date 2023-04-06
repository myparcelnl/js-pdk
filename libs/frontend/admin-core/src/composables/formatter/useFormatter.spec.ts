import {Format, FormatterTranslateFunction} from './formatter.types';
import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {INJECT_ADMIN_INSTANCE} from '../../data';
import {createAdminConfig} from '../../pdk';
import {createLogger} from '../../services';
import {useFormatter} from './useFormatter';

describe('format strings', () => {
  const fakeDate = new Date('2022-12-05T12:00:00.000Z');

  beforeEach(() => {
    vi.mock('vue', async () => {
      const realVue: any = await vi.importActual('vue');

      return {
        ...realVue,

        inject(key: symbol) {
          if (INJECT_ADMIN_INSTANCE === key) {
            return {
              appName: 'test',
              context: {},
              // @ts-expect-error no need for components
              config: createAdminConfig({components: {}}),
              logger: createLogger('test'),
            };
          }
        },
      };
    });
  });

  afterEach(() => {
    const formatter = useFormatter('');
    formatter.formats.value = {};
    vi.restoreAllMocks();
  });

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
      expectation: 'Gisteren',
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
      expectation: 'Time_seconds_past',
    },
    {
      date: new Date('2022-12-05T12:00:00.001Z'),
      expectation: 'Time_seconds_future',
    },
    {
      date: new Date('2022-12-05T12:01:00.000Z'),
      expectation: 'Over 1 minuut',
    },
    {
      date: new Date('2022-12-05T12:30:00.000Z'),
      expectation: 'Over 30 minuten',
    },
    {
      date: new Date('2022-12-05T13:00:00.000Z'),
      expectation: 'Over 1 uur',
    },
    {
      date: new Date('2022-12-11T12:00:00.000Z'),
      expectation: 'Over 6 dagen',
    },
    {
      date: new Date('2022-12-12T12:00:00.000Z'),
      expectation: 'Over 7 dagen',
    },
    {
      date: new Date('2022-12-19T12:00:00.000Z'),
      expectation: '19 december 2022',
    },
  ])("formats date relative to '$date' as $expectation", ({date, expectation}) => {
    const dateSpy = vi.spyOn(global.Date, 'now');
    dateSpy.mockImplementation(() => fakeDate.getTime());

    const formatter = useFormatter('nl-NL');

    expect(formatter.format(Format.DateRelative, date)).toBe(expectation);

    dateSpy.mockRestore();
  });

  it.each([
    {
      date: new Date('2022-12-05T11:59:30.000Z'),
      expectation: 'A few seconds ago',
    },
    {
      date: new Date('2022-12-05T12:00:00.001Z'),
      expectation: 'In a few seconds',
    },
  ])('can translate strings', ({date, expectation}) => {
    const dateSpy = vi.spyOn(global.Date, 'now');
    dateSpy.mockImplementation(() => fakeDate.getTime());

    const translations: Record<string, string> = {
      time_seconds_past: 'A few seconds ago',
      time_seconds_future: 'In a few seconds',
    };

    const translateFunction: FormatterTranslateFunction = (string) => (string ? translations[string] : '');

    const formatter = useFormatter('nl-NL', translateFunction);

    expect(formatter.format(Format.DateRelative, date)).toBe(expectation);

    dateSpy.mockRestore();
  });

  it('formats date', () => {
    const formatter = useFormatter('nl-NL');

    expect(formatter.format(Format.DateLong, fakeDate)).toBe('5 december 2022');
  });
});
