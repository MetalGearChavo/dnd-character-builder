import { describe, it, expect } from 'vitest'
import { skills } from './skills'
import { skillDescriptionsEn, skillDescriptionsIt, skillDescriptionsEs, getSkillDescription } from './skillDescriptions'

describe('skillDescriptions', () => {
  it('has an English, Italian and Spanish description for every skill', () => {
    for (const skill of skills) {
      expect(skillDescriptionsEn[skill.id], skill.id).toBeTruthy()
      expect(skillDescriptionsIt[skill.id], skill.id).toBeTruthy()
      expect(skillDescriptionsEs[skill.id], skill.id).toBeTruthy()
    }
  })

  it('getSkillDescription returns the description in the requested locale', () => {
    expect(getSkillDescription('stealth', 'en')).toBe(skillDescriptionsEn.stealth)
    expect(getSkillDescription('stealth', 'it')).toBe(skillDescriptionsIt.stealth)
    expect(getSkillDescription('stealth', 'es')).toBe(skillDescriptionsEs.stealth)
  })

  it('falls back to English for an unsupported locale', () => {
    expect(getSkillDescription('stealth', 'fr')).toBe(skillDescriptionsEn.stealth)
  })

  it('returns an empty string for an unknown skill id', () => {
    expect(getSkillDescription('not-a-real-skill', 'en')).toBe('')
  })
})
