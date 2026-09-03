import { renderHook, act } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { useFavorites } from './useFavorites';

describe('useFavorites', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('starts empty', () => {
    const { result } = renderHook(() => useFavorites());
    expect(result.current.favorites).toEqual([]);
  });

  it('toggles a station on and off', () => {
    const { result } = renderHook(() => useFavorites());

    act(() => result.current.toggleFavorite('kiki-tamil'));
    expect(result.current.isFavorite('kiki-tamil')).toBe(true);

    act(() => result.current.toggleFavorite('kiki-tamil'));
    expect(result.current.isFavorite('kiki-tamil')).toBe(false);
  });

  it('persists to localStorage', () => {
    const { result } = renderHook(() => useFavorites());
    act(() => result.current.toggleFavorite('kiki-melody'));

    expect(JSON.parse(localStorage.getItem('kikifm.favorites') ?? '[]')).toContain('kiki-melody');
  });
});
