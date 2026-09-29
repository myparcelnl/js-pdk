import {afterEach, beforeEach, describe, expect, it, vi} from 'vitest';
import {debounceUpdateListener} from './debounceUpdateListener';

type State = {weight: number; carrier: string};

const initial: State = {weight: 30000, carrier: 'postnl'};
const lighter: State = {weight: 15000, carrier: 'postnl'};
const otherCarrier: State = {weight: 15000, carrier: 'dpd'};

describe('debounceUpdateListener', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('calls the listener once with the newest state and the state before the first change', () => {
    const listener = vi.fn();
    const debounced = debounceUpdateListener<State>(listener);

    void debounced(lighter, initial);
    void debounced(otherCarrier, lighter);
    vi.advanceTimersByTime(100);

    expect(listener).toHaveBeenCalledOnce();
    expect(listener).toHaveBeenCalledWith(otherCarrier, initial);
  });

  it('does not call the listener before the store has not changed for the delay', () => {
    const listener = vi.fn();
    const debounced = debounceUpdateListener<State>(listener, 100);

    void debounced(lighter, initial);
    vi.advanceTimersByTime(99);

    expect(listener).not.toHaveBeenCalled();
  });

  it('uses the old state of the next change after the listener was called', () => {
    const listener = vi.fn();
    const debounced = debounceUpdateListener<State>(listener);

    void debounced(lighter, initial);
    vi.advanceTimersByTime(100);
    void debounced(otherCarrier, lighter);
    vi.advanceTimersByTime(100);

    expect(listener).toHaveBeenLastCalledWith(otherCarrier, lighter);
  });
});
