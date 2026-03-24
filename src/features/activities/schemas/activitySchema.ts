import { z } from 'zod'
import { FAS_OPTIONS, ROLL_OPTIONS, PRIORITY_LEVELS } from '@/types'

/**
 * Activity Form Validation Schema
 * UPDATED: Now matches actual backend API schema
 * 
 * Backend fields from Swagger:
 * - process_nr, process, fas, roll, behov
 * - effekten_vardet, extra_info, acceptans, feature_losning
 * - out_input, ska_inga_i_loneperiod
 * - priority (0-4), status
 */
export const activitySchema = z.object({
  // Core process fields
  process_nr: z
    .string()
    .max(50, 'Processnummer får max vara 50 tecken')
    .optional()
    .default(''),
  
  process: z
    .string({ required_error: 'Process är obligatorisk' })
    .min(1, 'Process är obligatorisk')
    .min(3, 'Process måste vara minst 3 tecken')
    .max(200, 'Process får max vara 200 tecken'),
  
  fas: z
    .string({ required_error: 'Fas är obligatorisk' })
    .min(1, 'Fas är obligatorisk'),
  
  roll: z
    .string({ required_error: 'Roll är obligatorisk' })
    .min(1, 'Roll är obligatorisk'),
  
  behov: z
    .string({ required_error: 'Behov är obligatoriskt' })
    .min(1, 'Behov är obligatoriskt')
    .min(10, 'Behov måste vara minst 10 tecken')
    .max(1000, 'Behov får max vara 1000 tecken'),
  
  // Additional fields
  effekten_vardet: z
    .string()
    .max(500, 'Effekten/värdet får max vara 500 tecken')
    .optional()
    .default(''),
  
  extra_info: z
    .string()
    .max(1000, 'Extra info får max vara 1000 tecken')
    .optional()
    .default(''),
  
  acceptans: z
    .string()
    .max(500, 'Acceptans får max vara 500 tecken')
    .optional()
    .default(''),
  
  feature_losning: z
    .string()
    .max(500, 'Feature/lösning får max vara 500 tecken')
    .optional()
    .default(''),
  
  out_input: z
    .string()
    .max(200, 'Output/Input får max vara 200 tecken')
    .optional()
    .default(''),
  
  ska_inga_i_loneperiod: z
    .boolean()
    .optional()
    .default(false),
  
  // Status and priority
  status: z.enum(
    ['active', 'draft', 'pending', 'in_progress', 'completed', 'blocked'] as const,
    {
      errorMap: () => ({ message: 'Välj en giltig status' }),
    }
  ),
  
  priority: z
    .number()
    .min(0, 'Prioritet måste vara mellan 0 och 4')
    .max(4, 'Prioritet måste vara mellan 0 och 4')
    .optional()
    .default(2), // Medium priority
})

export type ActivityFormData = z.infer<typeof activitySchema>
