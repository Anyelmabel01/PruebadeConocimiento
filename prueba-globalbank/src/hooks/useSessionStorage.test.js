import { renderHook, act } from '@testing-library/react';
import useSessionStorage from './useSessionStorage';

beforeEach(() => {
  sessionStorage.clear();
});

describe('useSessionStorage Hook', () => {
  test('returns initial value when no stored value exists', () => {
    const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

    expect(result.current[0]).toBe('initial');
  });

  test('returns stored value when it exists', () => {
    sessionStorage.setItem('test-key', JSON.stringify('stored-value'));

    const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

    expect(result.current[0]).toBe('stored-value');
  });

  test('updates sessionStorage when value changes', () => {
    const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('new-value');
    });

    const stored = sessionStorage.getItem('test-key');
    expect(JSON.parse(stored)).toBe('new-value');
    expect(result.current[0]).toBe('new-value');
  });

  test('handles array values correctly', () => {
    const { result } = renderHook(() => useSessionStorage('array-key', []));

    act(() => {
      result.current[1]([1, 2, 3]);
    });

    expect(result.current[0]).toEqual([1, 2, 3]);

    const stored = sessionStorage.getItem('array-key');
    expect(JSON.parse(stored)).toEqual([1, 2, 3]);
  });

  test('handles object values correctly', () => {
    const { result } = renderHook(() => useSessionStorage('object-key', {}));

    act(() => {
      result.current[1]({ name: 'test', age: 25 });
    });

    expect(result.current[0]).toEqual({ name: 'test', age: 25 });

    const stored = sessionStorage.getItem('object-key');
    expect(JSON.parse(stored)).toEqual({ name: 'test', age: 25 });
  });

  test('handles parse errors gracefully', () => {
    sessionStorage.setItem('bad-key', 'invalid-json{');

    const { result } = renderHook(() => useSessionStorage('bad-key', 'fallback'));

    expect(result.current[0]).toBe('fallback');
  });

  test('handles storage errors gracefully', () => {
    const mockSetItem = jest.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('Storage full');
    });

    const { result } = renderHook(() => useSessionStorage('test-key', 'initial'));

    act(() => {
      result.current[1]('new-value');
    });

    expect(result.current[0]).toBe('new-value');

    mockSetItem.mockRestore();
  });

  test('multiple hooks with different keys work independently', () => {
    const { result: result1 } = renderHook(() => useSessionStorage('key1', 'value1'));
    const { result: result2 } = renderHook(() => useSessionStorage('key2', 'value2'));

    expect(result1.current[0]).toBe('value1');
    expect(result2.current[0]).toBe('value2');

    act(() => {
      result1.current[1]('updated1');
    });

    expect(result1.current[0]).toBe('updated1');
    expect(result2.current[0]).toBe('value2');
  });
});
