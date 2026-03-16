import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useActivities, useActivity, useCreateActivity } from './useActivities';
import * as activitiesService from '../../lib/api/services/activities';
import type { Activity } from '../../types/activity';

vi.mock('../../lib/api/services/activities');

const mockActivity: Activity = {
  id: '1',
  title: 'Test Activity',
  description: 'Test Description',
  type: 'payroll',
  priority: 'high',
  status: 'pending',
  dueDate: '2024-03-20',
  createdAt: '2024-03-15T10:00:00Z',
  updatedAt: '2024-03-15T10:00:00Z',
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

describe('useActivities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch activities successfully', async () => {
    vi.mocked(activitiesService.getActivities).mockResolvedValue([mockActivity]);

    const { result } = renderHook(() => useActivities(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual([mockActivity]);
    expect(activitiesService.getActivities).toHaveBeenCalledTimes(1);
  });

  it('should pass filters to the query function', async () => {
    vi.mocked(activitiesService.getActivities).mockResolvedValue([mockActivity]);

    const filters = { status: 'pending' as const };
    renderHook(() => useActivities(filters), {
      wrapper: createWrapper(),
    });

    await waitFor(() =>
      expect(activitiesService.getActivities).toHaveBeenCalledWith(filters),
    );
  });
});

describe('useActivity', () => {
  it('should fetch single activity', async () => {
    vi.mocked(activitiesService.getActivity).mockResolvedValue(mockActivity);

    const { result } = renderHook(() => useActivity('1'), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockActivity);
    expect(activitiesService.getActivity).toHaveBeenCalledWith('1');
  });

  it('should not fetch when id is empty', () => {
    const { result } = renderHook(() => useActivity(''), {
      wrapper: createWrapper(),
    });

    expect(result.current.fetchStatus).toBe('idle');
    expect(activitiesService.getActivity).not.toHaveBeenCalled();
  });
});

describe('useCreateActivity', () => {
  it('should create activity successfully', async () => {
    vi.mocked(activitiesService.createActivity).mockResolvedValue(mockActivity);

    const { result } = renderHook(() => useCreateActivity(), {
      wrapper: createWrapper(),
    });

    const newActivity = {
      title: 'New Activity',
      description: 'Description',
      type: 'payroll' as const,
      priority: 'high' as const,
      status: 'pending' as const,
      dueDate: '2024-03-20',
    };

    result.current.mutate(newActivity);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(activitiesService.createActivity).toHaveBeenCalledWith(newActivity);
    expect(result.current.data).toEqual(mockActivity);
  });
});
