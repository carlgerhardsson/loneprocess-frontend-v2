import { describe, it, expect } from 'vitest'
import { activitySchema } from './activitySchema'

describe('activitySchema', () => {
  it('validates valid activity data', () => {
    const validData = {
      title: 'Test Activity',
      description: 'This is a test description with enough characters',
      type: 'salary' as const,
      status: 'pending' as const,
      priority: 'medium' as const,
    }

    const result = activitySchema.safeParse(validData)
    expect(result.success).toBe(true)
  })

  it('requires title', () => {
    const data = {
      description: 'Test description',
      type: 'salary' as const,
      status: 'pending' as const,
      priority: 'medium' as const,
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Titel är obligatorisk')
    }
  })

  it('validates title minimum length', () => {
    const data = {
      title: 'Ab',
      description: 'Test description with enough characters',
      type: 'salary' as const,
      status: 'pending' as const,
      priority: 'medium' as const,
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Titel måste vara minst 3 tecken')
    }
  })

  it('validates title maximum length', () => {
    const data = {
      title: 'A'.repeat(101),
      description: 'Test description',
      type: 'salary' as const,
      status: 'pending' as const,
      priority: 'medium' as const,
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Titel får max vara 100 tecken')
    }
  })

  it('requires description', () => {
    const data = {
      title: 'Test Activity',
      type: 'salary' as const,
      status: 'pending' as const,
      priority: 'medium' as const,
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Beskrivning är obligatorisk')
    }
  })

  it('validates description minimum length', () => {
    const data = {
      title: 'Test Activity',
      description: 'Short',
      type: 'salary' as const,
      status: 'pending' as const,
      priority: 'medium' as const,
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Beskrivning måste vara minst 10 tecken')
    }
  })

  it('validates description maximum length', () => {
    const data = {
      title: 'Test Activity',
      description: 'A'.repeat(1001),
      type: 'salary' as const,
      status: 'pending' as const,
      priority: 'medium' as const,
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Beskrivning får max vara 1000 tecken')
    }
  })

  it('validates type enum', () => {
    const data = {
      title: 'Test Activity',
      description: 'Test description',
      type: 'invalid' as unknown,
      status: 'pending' as const,
      priority: 'medium' as const,
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Välj en giltig typ')
    }
  })

  it('validates status enum', () => {
    const data = {
      title: 'Test Activity',
      description: 'Test description',
      type: 'salary' as const,
      status: 'invalid' as unknown,
      priority: 'medium' as const,
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Välj en giltig status')
    }
  })

  it('validates priority enum', () => {
    const data = {
      title: 'Test Activity',
      description: 'Test description',
      type: 'salary' as const,
      status: 'pending' as const,
      priority: 'invalid' as unknown,
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe('Välj en giltig prioritet')
    }
  })

  it('accepts optional fields', () => {
    const data = {
      title: 'Test Activity',
      description: 'Test description with enough characters',
      type: 'salary' as const,
      status: 'pending' as const,
      priority: 'medium' as const,
      assignedTo: 'John Doe',
      dueDate: '2024-12-31',
      tags: ['important', 'urgent'],
    }

    const result = activitySchema.safeParse(data)
    expect(result.success).toBe(true)
  })
})
