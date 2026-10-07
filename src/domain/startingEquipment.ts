/**
 * Resolves a class's official (PHB) starting-equipment choices into the flat
 * shape the character sheet stores, and diffs two resolutions so the
 * Equipment step can apply a re-pick without clobbering anything the player
 * added by hand.
 *
 * Framework-free on purpose, like `src/domain/armi.ts`: data in, data out, no
 * Vue or store import, so the same resolution logic can be unit tested
 * directly and never drifts from what the step renders.
 */

/** A single thing a starting-equipment choice can grant. */
export type StartingEquipmentGrant =
  | { kind: 'weapon'; name: string }
  | { kind: 'armor'; name: string }
  | { kind: 'shield' }
  | { kind: 'pack'; name: string }
  | { kind: 'item'; name: string }

/** One of the radio options on a choice line (e.g. "chain mail"). */
export interface StartingEquipmentOption {
  readonly grants: readonly StartingEquipmentGrant[]
}

/**
 * One PHB line, e.g. "(a) chain mail or (b) leather armor, a longbow, and 20
 * arrows". `fixed` grants are always applied; `choose` renders as radio
 * options and only the selected one is applied. A line can have both (rare)
 * or just one of the two.
 */
export interface StartingEquipmentEntry {
  readonly fixed?: readonly StartingEquipmentGrant[]
  readonly choose?: readonly StartingEquipmentOption[]
}

/** Equipment packs as looked up from `equipmentData.packs` — name + contents. */
export interface EquipmentPackLookup {
  readonly name: string
  readonly items: readonly string[]
}

/** The flat shape the Equipment step writes onto `character.*`. */
export interface ResolvedEquipment {
  weapons: string[]
  armor: string | null
  shield: boolean
  items: string[]
}

function emptyResolved(): ResolvedEquipment {
  return { weapons: [], armor: null, shield: false, items: [] }
}

/** One radio selection per entry, defaulting to the first PHB option (index 0). */
export function defaultSelections(entries: readonly StartingEquipmentEntry[]): number[] {
  return entries.map(() => 0)
}

function applyGrant(
  grant: StartingEquipmentGrant,
  result: ResolvedEquipment,
  packs: readonly EquipmentPackLookup[],
): void {
  switch (grant.kind) {
    case 'weapon':
      result.weapons.push(grant.name)
      break
    case 'armor':
      result.armor = grant.name
      break
    case 'shield':
      result.shield = true
      break
    case 'pack': {
      // The pack name itself becomes an "other equipment" entry, and its
      // contents are expanded alongside it — the player sees both the pack
      // they chose and what's in it, same as a hand-typed list would show.
      result.items.push(grant.name)
      const pack = packs.find(p => p.name === grant.name)
      if (pack) result.items.push(...pack.items)
      break
    }
    case 'item':
      result.items.push(grant.name)
      break
  }
}

/**
 * Resolves a class's choice entries against the player's radio picks into
 * the flat shape stored on the character. `selections[i]` out of range falls
 * back to the first option, so a saved sheet from before a class gained a new
 * choice line never crashes.
 */
export function resolveStartingEquipment(
  entries: readonly StartingEquipmentEntry[],
  selections: readonly number[],
  packs: readonly EquipmentPackLookup[] = [],
): ResolvedEquipment {
  const result = emptyResolved()
  entries.forEach((entry, i) => {
    for (const grant of entry.fixed ?? []) applyGrant(grant, result, packs)
    if (entry.choose && entry.choose.length > 0) {
      const raw = selections[i] ?? 0
      const idx = raw >= 0 && raw < entry.choose.length ? raw : 0
      const option = entry.choose[idx]
      if (option) for (const grant of option.grants) applyGrant(grant, result, packs)
    }
  })
  return result
}

/**
 * What changed between two resolutions, so applying a re-pick only touches
 * what the chooser itself granted — a weapon or item the player added by
 * hand under the same name is the one case this can't tell apart from an
 * auto-granted one, since the character sheet stores names only, not where
 * each one came from.
 */
export interface EquipmentDiff {
  weaponsAdd: string[]
  weaponsRemove: string[]
  itemsAdd: string[]
  itemsRemove: string[]
  /** `null` when armor is unchanged between the two resolutions. */
  armorChange: { from: string | null; to: string | null } | null
  /** `null` when the shield grant is unchanged between the two resolutions. */
  shieldChange: { from: boolean; to: boolean } | null
}

export function diffEquipment(prev: ResolvedEquipment, next: ResolvedEquipment): EquipmentDiff {
  return {
    weaponsRemove: prev.weapons.filter(w => !next.weapons.includes(w)),
    weaponsAdd: next.weapons.filter(w => !prev.weapons.includes(w)),
    itemsRemove: prev.items.filter(i => !next.items.includes(i)),
    itemsAdd: next.items.filter(i => !prev.items.includes(i)),
    armorChange: prev.armor !== next.armor ? { from: prev.armor, to: next.armor } : null,
    shieldChange: prev.shield !== next.shield ? { from: prev.shield, to: next.shield } : null,
  }
}
