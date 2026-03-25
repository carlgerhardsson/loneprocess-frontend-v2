# Mutation Hooks with Optimistic Updates

This directory contains React Query mutation hooks that implement optimistic UI updates for CRUD operations.

## Overview

Optimistic updates provide instant user feedback by updating the UI immediately, before waiting for the server response. If the server request fails, the UI automatically rolls back to the previous state.

## Available Hooks

### `useCreateActivity`

Creates a new activity with optimistic update.

```typescript
import { useCreateActivity } from '@/hooks/mutations'

const createMutation = useCreateActivity({
  onSuccess: (data) => {
    console.log('Created:', data)
  },
  onError: (error) => {
    console.error('Failed:', error)
  },
})

// Usage
createMutation.mutate({
  title: 'New Activity',
  type: 'salary',
  status: 'pending',
  priority: 'high',
})
```

**What happens:**
1. Activity appears in list instantly with temporary ID
2. Request sent to backend
3. On success: Temporary ID replaced with real ID from server
4. On error: Activity removed from list, error callback fired

---

### `useUpdateActivity`

Updates an existing activity with optimistic update.

```typescript
import { useUpdateActivity } from '@/hooks/mutations'

const updateMutation = useUpdateActivity({
  onSuccess: (data) => {
    console.log('Updated:', data)
  },
  onError: (error) => {
    console.error('Failed:', error)
  },
})

// Usage
updateMutation.mutate({
  id: 123,
  data: {
    title: 'Updated Title',
    status: 'completed',
  },
})
```

**What happens:**
1. Activity updates instantly in both list and detail views
2. Request sent to backend
3. On success: Cache revalidated with server data
4. On error: Activity reverted to original state

---

### `useDeleteActivity`

Deletes an activity with optimistic update.

```typescript
import { useDeleteActivity } from '@/hooks/mutations'

const deleteMutation = useDeleteActivity({
  onSuccess: () => {
    console.log('Deleted successfully')
  },
  onError: (error) => {
    console.error('Failed:', error)
  },
})

// Usage
deleteMutation.mutate(123)
```

**What happens:**
1. Activity removed from list instantly
2. Request sent to backend
3. On success: Removal confirmed
4. On error: Activity restored to list

---

## Benefits

### ⚡ Instant Feedback
Users see changes immediately without waiting for network requests.

### 🔄 Automatic Rollback
If a request fails, the UI automatically reverts to the previous state.

### 📦 Cache Management
React Query handles cache updates automatically - no manual `refetch()` needed.

### 🎯 Type Safety
Full TypeScript support with proper types for all mutations.

---

## Implementation Details

### Cache Keys

All hooks use standardized cache keys from `activitiesKeys`:

```typescript
activitiesKeys.lists() // ['activities', 'list', {}]
activitiesKeys.detail(id) // ['activities', 'detail', id]
```

### Optimistic Update Flow

```
1. onMutate
   ├─ Cancel ongoing queries
   ├─ Snapshot current cache
   └─ Update cache optimistically

2. mutationFn
   └─ Send request to backend

3. onSuccess / onError
   ├─ Success: Call onSuccess callback
   └─ Error: Rollback cache, call onError callback

4. onSettled
   └─ Invalidate queries to refetch fresh data
```

### Error Handling

Errors are handled gracefully:
- UI automatically reverts to previous state
- Error callback receives the error object
- Toast notifications can be shown in callbacks
- Cache remains consistent

---

## Testing

Each mutation hook can be tested with React Query's testing utilities:

```typescript
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useCreateActivity } from './useCreateActivity'

test('creates activity optimistically', async () => {
  const queryClient = new QueryClient()
  const wrapper = ({ children }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )

  const { result } = renderHook(() => useCreateActivity(), { wrapper })

  result.current.mutate({ title: 'Test', type: 'salary' })

  await waitFor(() => expect(result.current.isSuccess).toBe(true))
})
```

---

## Best Practices

### ✅ Do

- Use `mutate()` for fire-and-forget operations
- Use callbacks for UI feedback (toasts, navigation)
- Handle errors gracefully in `onError` callback
- Trust the automatic cache updates

### ❌ Don't

- Don't manually call `refetch()` after mutations
- Don't use `mutateAsync()` unless you need the promise
- Don't update cache manually (hooks do it for you)
- Don't forget to handle errors

---

## Migration Guide

If migrating from old mutation hooks:

### Before (old approach)
```typescript
const createMutation = useCreateActivity()

const handleSubmit = async (data) => {
  await createMutation.mutateAsync(data)
  refetch() // Manual refetch
  onSuccess()
}
```

### After (optimistic approach)
```typescript
const createMutation = useCreateActivity({
  onSuccess: () => {
    onSuccess() // No manual refetch needed
  },
})

const handleSubmit = (data) => {
  createMutation.mutate(data) // Instant UI update
}
```

---

## Related

- [React Query Optimistic Updates](https://tanstack.com/query/latest/docs/react/guides/optimistic-updates)
- [Milestone 4.5 Documentation](../../../docs/milestone-4.5-data-persistence.md)
- [Query Hooks](../queries/useActivities.ts)
