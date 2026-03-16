import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useActivities, useCreateActivity, useUpdateActivity, useDeleteActivity } from './useActivities';
import { activitiesService } from '@/lib/api/services/activities';
import type { Activity } from '@/types';

// Mock API service
vi.mock('@/lib/api/services/activities');

// Mock Zustand store
vi.mock('@/stores', () => ({
  useActivitiesStore: () => ({
    setActivities: vi.fn(),
    addActivity: vi.fn(),
    updateActivity: vi.fn(),
    removeActivity: vi.fn(),
  }),
}));

const mockActivity: Activity = {
  id: '1',
  periodId: 'period-1',
  title: 'Test Activity',
  type: 'manual',
  status: 'pending',
  priority: 'medium',
  description: 'Test description',
  assignedTo: 'user-1',
  dueDate: '2024-12-31',
  checklist: [],
  comments: [],
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

  return function Wrapper({ children }: { children: React.ReactNode }) {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };
}

describe('useActivities', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('fetches activities successfully', async () => {
    const mockActivities = [mockActivity];
    vi.mocked(activitiesService.getAll).mockResolvedValue(mockActivities);

    const { result } = renderHook(() => useActivities(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockActivities);
    expect(activitiesService.getAll).toHaveBeenCalledWith({});
  });

  it('handles fetch error', async () => {
    const error = new Error('Fetch failed');
    vi.mocked(activitiesService.getAll).mockRejectedValue(error);

    const { result } = renderHook(() => useActivities(), {
      wrapper: createWrapper(),
    });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toEqual(error);
  });
});

describe('useCreateActivity', () => {
  it('creates activity successfully', async () => {
    const newActivity = { ...mockActivity, id: undefined } as unknown as Activity;
    vi.mocked(activitiesService.create).mockResolvedValue(mockActivity);

    const { result } = renderHook(() => useCreateActivity(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(newActivity);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockActivity);
    expect(activitiesService.create).toHaveBeenCalledWith(newActivity);
  });
});

describe('useUpdateActivity', () => {
  it('updates activity successfully', async () => {
    const updates = { title: 'Updated Title' };
    const updatedActivity = { ...mockActivity, ...updates };
    vi.mocked(activitiesService.update).mockResolvedValue(updatedActivity);

    const { result } = renderHook(() => useUpdateActivity(), {
      wrapper: createWrapper(),
    });

    result.current.mutate({ id: mockActivity.id, data: updates });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(updatedActivity);
    expect(activitiesService.update).toHaveBeenCalledWith(mockActivity.id, updates);
  });
});

describe('useDeleteActivity', () => {
  it('deletes activity successfully', async () => {
    vi.mocked(activitiesService.delete).mockResolvedValue(undefined);

    const { result } = renderHook(() => useDeleteActivity(), {
      wrapper: createWrapper(),
    });

    result.current.mutate(mockActivity.id);

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(activitiesService.delete).toHaveBeenCalledWith(mockActivity.id);
  });
});
