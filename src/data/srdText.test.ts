import { describe, it, expect, beforeAll } from 'vitest'
import { testoTratto } from './srdText'
import { preloadVariantData } from './index'

describe('testoTratto', () => {
  beforeAll(async () => {
    await Promise.all([preloadVariantData('dnd5e'), preloadVariantData('dnd2024')])
  })

  // Regression test for the bug reported on the Race step: dragonborn's
  // "Draconic Ancestry" / "Breath Weapon" / "Damage Resistance" traits showed
  // "the SRD has no description for this entry" in every locale, because
  // getTraitDescription() only had text for Brancalonia and Apocalisse.
  it('a base dnd5e race trait has a description in English and Spanish', () => {
    for (const locale of ['en', 'es']) {
      const result = testoTratto('dnd5e', 'breath-weapon', locale)
      expect(result.stato, locale).toBe('presente')
    }
  })

  it('a base dnd5e race trait falls back to English-labelled text in Italian', () => {
    const result = testoTratto('dnd5e', 'breath-weapon', 'it')
    expect(result.stato).toBe('soloInglese')
  })

  it('a base dnd5e race trait is actually translated in Spanish, not English under the hood', () => {
    const result = testoTratto('dnd5e', 'darkvision', 'es')
    expect(result.stato).toBe('presente')
    expect(result.stato === 'presente' && result.testo).toContain('oscuridad')
    expect(result.stato === 'presente' && result.testo).not.toContain('dim light')
  })

  it('a base dnd2024 race trait has a description in English', () => {
    const result = testoTratto('dnd2024', 'draconic-ancestry', 'en')
    expect(result.stato).toBe('presente')
  })

  it('a base dnd2024 race trait falls back to English-labelled text in Spanish, since dnd2024 has no Spanish trait translations yet', () => {
    const result = testoTratto('dnd2024', 'draconic-ancestry', 'es')
    expect(result.stato).toBe('soloInglese')
  })

  it('an unknown trait id is reported as absent, not as an error', () => {
    expect(testoTratto('dnd5e', 'not-a-real-trait', 'en').stato).toBe('assente')
  })

  it('an empty trait id is reported as absent', () => {
    expect(testoTratto('dnd5e', '', 'en').stato).toBe('assente')
  })
})
