import { describe, it, expect } from 'vitest'
import { hasArmorProficiency } from './armorProficiency'

describe('hasArmorProficiency', () => {
  it('barbarian (light, medium, shields) can wear light/medium and carry a shield, but not heavy', () => {
    const profs = ['light', 'medium', 'shields']
    expect(hasArmorProficiency(profs, 'light')).toBe(true)
    expect(hasArmorProficiency(profs, 'medium')).toBe(true)
    expect(hasArmorProficiency(profs, 'heavy')).toBe(false)
    expect(hasArmorProficiency(profs, 'shield')).toBe(true)
  })

  it('a class with no armor proficiencies (monk, sorcerer, wizard) can wear or carry nothing', () => {
    expect(hasArmorProficiency([], 'light')).toBe(false)
    expect(hasArmorProficiency([], 'shield')).toBe(false)
  })

  it('fighter (light, medium, heavy, shields) can wear and carry everything', () => {
    const profs = ['light', 'medium', 'heavy', 'shields']
    expect(hasArmorProficiency(profs, 'light')).toBe(true)
    expect(hasArmorProficiency(profs, 'medium')).toBe(true)
    expect(hasArmorProficiency(profs, 'heavy')).toBe(true)
    expect(hasArmorProficiency(profs, 'shield')).toBe(true)
  })

  it('matches case-insensitively on both sides', () => {
    expect(hasArmorProficiency(['Light', 'SHIELDS'], 'LIGHT')).toBe(true)
    expect(hasArmorProficiency(['light', 'shields'], 'Shield')).toBe(true)
  })

  it('bridges the singular/plural mismatch between ArmorData.type and class data', () => {
    // ArmorData.type says 'shield'; class data says 'shields'. Neither side
    // should need to know about the other's spelling.
    expect(hasArmorProficiency(['shields'], 'shield')).toBe(true)
    expect(hasArmorProficiency(['shield'], 'shield')).toBe(false)
  })
})
