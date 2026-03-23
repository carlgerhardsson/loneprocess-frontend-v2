/**
 * Activity & Checklist Types
 */

export interface Activity {
  id: number // Backend uses number IDs
  title: string
  description: string | null
  type: ActivityType
  status: ActivityStatus
  priority: ActivityPriority
  assigned_to: string | null // Backend uses snake_case
  due_date: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
  period_id?: number
  checklist_items?: ChecklistItem[]
  comments?: Comment[]
  tags?: string[]
}

export type ActivityType = 'salary' | 'tax' | 'reporting' | 'audit' | 'recurring' | 'other'

export type ActivityStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled'

export type ActivityPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface ChecklistItem {
  id: string
  text: string
  is_completed: boolean
  completed_at: string | null
  completed_by: string | null
}

export interface Comment {
  id: string
  text: string
  author_id: string
  author_name: string
  created_at: string
  updated_at: string | null
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
