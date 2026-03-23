/**
 * Activity & Checklist Types
 */

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

export type ActivityType =
  | 'salary'
  | 'tax'
  | 'reporting'
  | 'review'
  | 'recurring'
  | 'other'

export type ActivityStatus = 'pending' | 'in_progress' | 'completed' | 'blocked' | 'cancelled'

export type ActivityPriority = 'low' | 'medium' | 'high' | 'urgent'

export interface ChecklistItem {
  id: string
  text: string
  isCompleted: boolean
  completedAt: string | null
  completedBy: string | null
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

/**
 * API Types for creating/updating activities
 */
export interface CreateActivityData {
  title: string
  description: string
  type: ActivityType
  status: ActivityStatus
  priority: ActivityPriority
  assignedTo?: string
  dueDate?: string
  tags?: string[]
  periodId?: string
}

export interface UpdateActivityData {
  title?: string
  description?: string
  type?: ActivityType
  status?: ActivityStatus
  priority?: ActivityPriority
  assignedTo?: string
  dueDate?: string
  tags?: string[]
  completedAt?: string
}
