import { describe, it, expect } from 'vitest';
import { queryClient, queryKeys } from './queryClient';

describe('queryClient', () => {
  it('should be configured with correct default options', () => {
    const defaults = queryClient.getDefaultOptions();

    expect(defaults.queries?.staleTime).toBe(1000 * 60 * 5);
    expect(defaults.queries?.gcTime).toBe(1000 * 60 * 10);
    expect(defaults.queries?.retry).toBe(1);
    expect(defaults.mutations?.retry).toBe(0);
  });
});

describe('queryKeys', () => {
  describe('activities', () => {
    it('should generate correct activity keys', () => {
      expect(queryKeys.activities.all).toEqual(['activities']);
      expect(queryKeys.activities.lists()).toEqual(['activities', 'list']);
      expect(queryKeys.activities.list({ status: 'active' })).toEqual([
        'activities',
        'list',
        { status: 'active' },
      ]);
      expect(queryKeys.activities.detail('123')).toEqual([
        'activities',
        'detail',
        '123',
      ]);
    });
  });

  describe('periods', () => {
    it('should generate correct period keys', () => {
      expect(queryKeys.periods.all).toEqual(['periods']);
      expect(queryKeys.periods.lists()).toEqual(['periods', 'list']);
      expect(queryKeys.periods.list({ year: 2024 })).toEqual([
        'periods',
        'list',
        { year: 2024 },
      ]);
      expect(queryKeys.periods.detail('456')).toEqual(['periods', 'detail', '456']);
      expect(queryKeys.periods.progress('456')).toEqual([
        'periods',
        'detail',
        '456',
        'progress',
      ]);
    });
  });
});
