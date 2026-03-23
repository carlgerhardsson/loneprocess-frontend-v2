import { z } from 'zod'

/**
 * Activity Form Validation Schema
 *
 * Zod schema for validating activity form data.
 */
export const activitySchema = z.object({
  title: z
    .string({ required_error: 'Titel är obligatorisk' })
    .min(1, 'Titel är obligatorisk')
    .min(3, 'Titel måste vara minst 3 tecken')
    .max(100, 'Titel får max vara 100 tecken'),
  description: z
    .string({ required_error: 'Beskrivning är obligatorisk' })
    .min(1, 'Beskrivning är obligatorisk')
    .min(10, 'Beskrivning måste vara minst 10 tecken')
    .max(1000, 'Beskrivning får max vara 1000 tecken'),
  type: z.enum(['salary', 'tax', 'reporting', 'audit', 'recurring', 'other'] as const, {
    errorMap: () => ({ message: 'Välj en giltig typ' }),
  }),
  status: z.enum(['pending', 'in_progress', 'completed', 'blocked', 'cancelled'] as const, {
    errorMap: () => ({ message: 'Välj en giltig status' }),
  }),
  priority: z.enum(['low', 'medium', 'high', 'urgent'] as const, {
    errorMap: () => ({ message: 'Välj en giltig prioritet' }),
  }),
  assignedTo: z.string().optional(),
  dueDate: z.string().optional(),
  tags: z.array(z.string()).optional(),
})

export type ActivityFormData = z.infer<typeof activitySchema>
