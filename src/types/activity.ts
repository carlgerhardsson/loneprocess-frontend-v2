/**
 * Activity & Checklist Types
 */

// Backend API types (snake_case, number IDs)
export interface ActivityAPI {
  id: number
  title: string
  description: string | null
  type: ActivityType
  status: ActivityStatus
  priority: ActivityPriority
  assigned_to: string | null
  due_date: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  period_id?: number
  checklist_items?: ChecklistItemAPI[]
  comments?: CommentAPI[]
  tags?: string[]
}

// Frontend UI types (camelCase, string IDs for compatibility)
export interface Activity {
  id: string
  title: string
  description: string
  type: ActivityType
  status: ActivityStatus
  priority: ActivityPriority
  assignedTo: string | null
  dueDate: string | null
  completedAt: string | null
  createdAt: string
  updatedAt: string
  periodId: string
  checklistItems: ChecklistItem[]
  comments: Comment[]
  tags: string[]
}

export type ActivityType = 'salary' | 'tax' | 'reporting' | 'review' | 'recurring' | 'other'

export type ActivityStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled'

export type ActivityPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface ChecklistItemAPI {
  id: string
  text: string
  is_completed: boolean
  completed_at: string | null
  completed_by: string | null
}

export interface ChecklistItem {
  id: string
  text: string
  isCompleted: boolean
  completedAt: string | null
  completedBy: string | null
}

export interface CommentAPI {
  id: string
  text: string
  author_id: string
  author_name: string
  created_at: string
  updated_at: string | null
}

export interface Comment {
  id: string
  text: string
  authorId: string
  authorName: string
  createdAt: string
  updatedAt: string | null
}

export interface ActivityFilters {
  status?: ActivityStatus[]
  type?: ActivityType[]
  priority?: ActivityPriority[]
  assignedTo?: string[]
  search?: string
  dateFrom?: string
  dateTo?: string
}

export interface ActivitiesState {
  activities: Activity[]
  selectedActivity: Activity | null
  filters: ActivityFilters
  isLoading: boolean
  error: string | null
}

// API Data Types (for creating/updating)
export interface CreateActivityData {
  title: string
  description?: string
  type?: ActivityType
  status?: ActivityStatus
  priority?: ActivityPriority
  assigned_to?: string
  due_date?: string
  period_id?: number
}

export interface UpdateActivityData {
  title?: string
  description?: string
  type?: ActivityType
  status?: ActivityStatus
  priority?: ActivityPriority
  assigned_to?: string
  due_date?: string
  completed_at?: string
}

// Adapter functions
export function activityFromAPI(api: ActivityAPI): Activity {
  return {
    id: String(api.id),
    title: api.title,
    description: api.description || '',
    type: api.type,
    status: api.status,
    priority: api.priority,
    assignedTo: api.assigned_to,
    dueDate: api.due_date,
    completedAt: api.completed_at,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
    periodId: api.period_id ? String(api.period_id) : '',
    checklistItems: api.checklist_items?.map(checklistFromAPI) || [],
    comments: api.comments?.map(commentFromAPI) || [],
    tags: api.tags || [],
  }
}

function checklistFromAPI(api: ChecklistItemAPI): ChecklistItem {
  return {
    id: api.id,
    text: api.text,
    isCompleted: api.is_completed,
    completedAt: api.completed_at,
    completedBy: api.completed_by,
  }
}

function commentFromAPI(api: CommentAPI): Comment {
  return {
    id: api.id,
    text: api.text,
    authorId: api.author_id,
    authorName: api.author_name,
    createdAt: api.created_at,
    updatedAt: api.updated_at,
  }
}
