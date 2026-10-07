/**
 * Whether a class is proficient with a given armor type.
 *
 * Nothing in the app enforced this before: the manual armor picker in the
 * Equipment step listed every armor to every class, and a Wizard could
 * freely select Plate. This is the one shared rule both the step and the
 * random generator should read, so the check can't drift between the two
 * the way the attack-bonus math once did (see `armi.ts`).
 *
 * Framework- and data-layer-agnostic on purpose: takes the raw strings
 * already on `CharacterClass.armorProficiencies` and `ArmorData.type`,
 * imports neither.
 */

/**
 * Class data spells the shield proficiency as `'shields'` (plural);
 * `ArmorData.type` spells the armor piece as `'shield'` (singular). This is
 * the one place that mismatch gets bridged.
 */
export function hasArmorProficiency(
  armorProficiencies: readonly string[],
  armorType: string,
): boolean {
  const key = armorType.toLowerCase() === 'shield' ? 'shields' : armorType.toLowerCase()
  return armorProficiencies.some(p => p.toLowerCase() === key)
}
