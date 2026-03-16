import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { usePeriods, usePeriod, usePeriodProgress } from './usePeriods';
import * as periodsService from '../../lib/api/services/periods';
import type { Period } from '../../types/period';

vi.mock('../../lib/api/services/periods');

const mockPeriod: Period = {
  id: '1',
  name: 'January 2024',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  type: 'monthly',
  status: 'active',
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

const mockProgress = {
  total: 10,
  completed: 7,
  percentage: 70,
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

describe('usePeriods', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch periods successfully', async () => {
    vi.mocked(periodsService.getPeriods).mockResolvedValue([mockPeriod]);

    const { result } = renderHook(() => usePeriods(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([mockPeriod]);
    expect(periodsService.getPeriods).toHaveBeenCalledTimes(1);
  });

  it('should pass filters to query function', async () => {
    vi.mocked(periodsService.getPeriods).mockResolvedValue([mockPeriod]);

    const filters = { year: 2024, status: 'active' as const };
    renderHook(() => usePeriods(filters), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(periodsService.getPeriods).toHaveBeenCalledWith(filters),
    );
  });
});

describe('usePeriod', () => {
  it('should fetch single period', async () => {
    vi.mocked(periodsService.getPeriod).mockResolvedValue(mockPeriod);

    const { result } = renderHook(() => usePeriod('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockPeriod);
    expect(periodsService.getPeriod).toHaveBeenCalledWith('1');
  });
});

describe('usePeriodProgress', () => {
  it('should fetch period progress', async () => {
    vi.mocked(periodsService.getPeriodProgress).mockResolvedValue(mockProgress);

    const { result } = renderHook(() => usePeriodProgress('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockProgress);
    expect(periodsService.getPeriodProgress).toHaveBeenCalledWith('1');
  });

  it('should not fetch when id is empty', () => {
    const { result } = renderHook(() => usePeriodProgress(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(periodsService.getPeriodProgress).not.toHaveBeenCalled();
  });
});
