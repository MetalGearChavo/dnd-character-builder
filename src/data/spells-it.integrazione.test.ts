import { describe, it, expect } from 'vitest'
import { ensureSpellTexts, getSpellText } from '@/data/spells-it'

describe('verifica di integrazione: il testo tradotto arriva davvero', () => {
  it('gli incantesimi del chierico di prova hanno il testo, in italiano', async () => {
    await ensureSpellTexts('dnd5e', 'it')
    const ids = ['guidance', 'mending', 'light', '1-cure-wounds', '2-locate-object',
                 '1-protection-from-evil-and-good', '2-find-traps', '2-calm-emotions', '2-gentle-repose']
    const mancanti = ids.filter(id => !getSpellText('dnd5e', 'it', id)?.testo)
    expect(mancanti).toEqual([])
    const cura = getSpellText('dnd5e', 'it', '1-cure-wounds')!
    expect(cura.testo).toMatch(/creatura|incantatore|punti ferita/i)
    expect(cura.testo).not.toMatch(/Rivendita vietata|Not for resale/)
  })

  it('i due incantesimi fuori SRD non hanno testo, e non è un errore', async () => {
    await ensureSpellTexts('dnd5e', 'it')
    expect(getSpellText('dnd5e', 'it', 'blade-ward')?.testo).toBeUndefined()
  })

  it('il 2024 ha la sua edizione italiana, non quella del 2014', async () => {
    await ensureSpellTexts('dnd2024', 'it')
    const t2024 = getSpellText('dnd2024', 'it', '1-cure-wounds')?.testo
    const t2014 = getSpellText('dnd5e', 'it', '1-cure-wounds')?.testo
    expect(t2024).toBeTruthy()
    expect(t2024).not.toBe(t2014)
  })

  it('gli stessi incantesimi del chierico di prova hanno il testo, in spagnolo (solo 2014)', async () => {
    await ensureSpellTexts('dnd5e', 'es')
    const ids = ['guidance', 'mending', 'light', '1-cure-wounds', '2-locate-object',
                 '1-protection-from-evil-and-good', '2-find-traps', '2-calm-emotions', '2-gentle-repose']
    const mancanti = ids.filter(id => !getSpellText('dnd5e', 'es', id)?.testo)
    expect(mancanti).toEqual([])
    const cura = getSpellText('dnd5e', 'es', '1-cure-wounds')!
    expect(cura.testo).toMatch(/criatura|conjurador|puntos de golpe/i)
  })

  it('il 2024 in spagnolo non esiste ancora: ricade sull\'inglese', async () => {
    await ensureSpellTexts('dnd2024', 'es')
    expect(getSpellText('dnd2024', 'es', '1-cure-wounds')).toBeUndefined()
  })
})
