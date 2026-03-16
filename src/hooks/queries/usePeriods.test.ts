import { createElement } from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { usePeriods, useCreatePeriod, useUpdatePeriod, useDeletePeriod } from './usePeriods';
import { periodsService } from '@/lib/api/services/periods';
import type { Period } from '@/types';
import type { ReactNode } from 'react';

// Mock API service
vi.mock('@/lib/api/services/periods');

// Mock Zustand store
vi.mock('@/stores', () => ({
  usePeriodsStore: () => ({
    setPeriods: vi.fn(),
    addPeriod: vi.fn(),
    updatePeriod: vi.fn(),
    deletePeriod: vi.fn(),
  }),
}));

const mockPeriod: Period = {
  id: '1',
  name: '2024-01',
  type: 'monthly',
  status: 'active',
  startDate: '2024-01-01',
  endDate: '2024-01-31',
  activityCount: 0,
  completedActivityCount: 0,
  createdAt: '2024-01-01T00:00:00Z',
  updatedAt: '2024-01-01T00:00:00Z',
};

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return function Wrapper({ children }: { children: ReactNode }) {
    return createElement(QueryClientProvider, { client: queryClient }, children);
  };
}

describe('usePeriods', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches periods successfully', async () => {
    const mockPeriods = [mockPeriod];
    vi.mocked(periodsService.list).mockResolvedValue(mockPeriods);

    const { result } = renderHook(() => usePeriods(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockPeriods);
    expect(periodsService.list).toHaveBeenCalled();
  });

  it('handles fetch error', async () => {
    const error = new Error('Fetch failed');
    vi.mocked(periodsService.list).mockRejectedValue(error);

    const { result } = renderHook(() => usePeriods(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(error);
  });
});

describe('useCreatePeriod', () => {
  it('creates period successfully', async () => {
    const newPeriod = { ...mockPeriod, id: undefined } as unknown as Period;
    vi.mocked(periodsService.create).mockResolvedValue(mockPeriod);

    const { result } = renderHook(() => useCreatePeriod(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(newPeriod);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockPeriod);
    expect(periodsService.create).toHaveBeenCalledWith(newPeriod);
  });
});

describe('useUpdatePeriod', () => {
  it('updates period successfully', async () => {
    const updates = { name: '2024-02' };
    const updatedPeriod = { ...mockPeriod, ...updates };
    vi.mocked(periodsService.update).mockResolvedValue(updatedPeriod);

    const { result } = renderHook(() => useUpdatePeriod(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ id: mockPeriod.id, data: updates });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(updatedPeriod);
    expect(periodsService.update).toHaveBeenCalledWith(mockPeriod.id, updates);
  });
});

describe('useDeletePeriod', () => {
  it('deletes period successfully', async () => {
    vi.mocked(periodsService.delete).mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeletePeriod(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockPeriod.id);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(periodsService.delete).toHaveBeenCalledWith(mockPeriod.id);
  });
});
