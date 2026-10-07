import { describe, it, expect } from 'vitest'
import {
  resolveStartingEquipment,
  defaultSelections,
  diffEquipment,
  type StartingEquipmentEntry,
  type EquipmentPackLookup,
} from './startingEquipment'

const PACKS: EquipmentPackLookup[] = [
  { name: "Explorer's Pack", items: ['Backpack', 'Bedroll', 'Waterskin'] },
  { name: "Dungeoneer's Pack", items: ['Backpack', 'Crowbar', '10 torches'] },
]

const FIGHTER_ENTRIES: StartingEquipmentEntry[] = [
  {
    choose: [
      { grants: [{ kind: 'armor', name: 'Chain Mail' }] },
      { grants: [{ kind: 'armor', name: 'Leather' }, { kind: 'weapon', name: 'Longbow' }, { kind: 'item', name: '20 arrows' }] },
    ],
  },
  {
    choose: [
      { grants: [{ kind: 'weapon', name: 'Longsword' }, { kind: 'shield' }] },
      { grants: [{ kind: 'weapon', name: 'Longsword' }, { kind: 'weapon', name: 'Handaxe' }] },
    ],
  },
  {
    choose: [
      { grants: [{ kind: 'pack', name: "Dungeoneer's Pack" }] },
      { grants: [{ kind: 'pack', name: "Explorer's Pack" }] },
    ],
  },
]

describe('defaultSelections', () => {
  it('defaults every entry to the first PHB option', () => {
    expect(defaultSelections(FIGHTER_ENTRIES)).toEqual([0, 0, 0])
  })

  it('returns an empty array for a class with no choices', () => {
    expect(defaultSelections([])).toEqual([])
  })
})

describe('resolveStartingEquipment', () => {
  it('applies fixed grants regardless of selection', () => {
    const entries: StartingEquipmentEntry[] = [
      { fixed: [{ kind: 'item', name: 'spellbook' }, { kind: 'item', name: 'component pouch' }] },
    ]
    const result = resolveStartingEquipment(entries, [0])
    expect(result.items).toEqual(['spellbook', 'component pouch'])
  })

  it('applies the selected option, not the others', () => {
    const result = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 0], PACKS)
    expect(result.armor).toBe('Chain Mail')
    expect(result.weapons).toEqual(['Longsword'])
    expect(result.shield).toBe(true)
  })

  it('switching the armor option replaces armor and adds the weapon/item that come with it', () => {
    const result = resolveStartingEquipment(FIGHTER_ENTRIES, [1, 0, 0], PACKS)
    expect(result.armor).toBe('Leather')
    expect(result.weapons).toEqual(['Longbow', 'Longsword'])
    expect(result.items).toContain('20 arrows')
  })

  it('expands a chosen pack into its contents, keeping the pack name as an item too', () => {
    const result = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 1], PACKS)
    expect(result.items).toEqual(["Explorer's Pack", 'Backpack', 'Bedroll', 'Waterskin'])
  })

  it('falls back to the first option when a selection index is out of range', () => {
    // A saved sheet from before a class gained more choice lines should not crash.
    const result = resolveStartingEquipment(FIGHTER_ENTRIES, [5, -1], PACKS)
    expect(result.armor).toBe('Chain Mail')
    expect(result.weapons).toEqual(['Longsword'])
  })

  it('an entry with no choose and no fixed grants nothing', () => {
    const result = resolveStartingEquipment([{}], [0])
    expect(result).toEqual({ weapons: [], armor: null, shield: false, items: [] })
  })
})

describe('diffEquipment', () => {
  it('reports no change when both resolutions are identical', () => {
    const a = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 0], PACKS)
    const b = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 0], PACKS)
    const diff = diffEquipment(a, b)
    expect(diff).toEqual({
      weaponsAdd: [], weaponsRemove: [], itemsAdd: [], itemsRemove: [],
      armorChange: null, shieldChange: null,
    })
  })

  it('switching armor option A→B reports exactly the delta, not a full replace', () => {
    const prev = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 0], PACKS)
    const next = resolveStartingEquipment(FIGHTER_ENTRIES, [1, 0, 0], PACKS)
    const diff = diffEquipment(prev, next)
    expect(diff.armorChange).toEqual({ from: 'Chain Mail', to: 'Leather' })
    expect(diff.weaponsAdd).toEqual(['Longbow'])
    expect(diff.weaponsRemove).toEqual([])
    expect(diff.itemsAdd).toEqual(['20 arrows'])
  })

  it('switching the weapon option off reports the shield grant as lost', () => {
    const prev = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 0], PACKS)
    const next = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 1, 0], PACKS)
    const diff = diffEquipment(prev, next)
    expect(diff.shieldChange).toEqual({ from: true, to: false })
    expect(diff.weaponsAdd).toEqual(['Handaxe'])
    expect(diff.weaponsRemove).toEqual([])
  })

  it('an item present in both resolutions is not re-added or removed', () => {
    const prev = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 0], PACKS)
    // Simulate a manual extra under the same name as something auto-granted:
    // it must not show up as a remove just because the selection changed.
    const next = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 0], PACKS)
    const diff = diffEquipment(prev, next)
    expect(diff.itemsAdd).toEqual([])
    expect(diff.itemsRemove).toEqual([])
  })

  it('switching pack option swaps pack contents without touching unrelated items', () => {
    const prev = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 0], PACKS)
    const next = resolveStartingEquipment(FIGHTER_ENTRIES, [0, 0, 1], PACKS)
    const diff = diffEquipment(prev, next)
    expect(diff.itemsRemove).toEqual(["Dungeoneer's Pack", 'Crowbar', '10 torches'])
    expect(diff.itemsAdd).toEqual(["Explorer's Pack", 'Bedroll', 'Waterskin'])
    // Backpack is in both packs, so it is untouched either way.
    expect(diff.itemsAdd).not.toContain('Backpack')
    expect(diff.itemsRemove).not.toContain('Backpack')
  })
})
