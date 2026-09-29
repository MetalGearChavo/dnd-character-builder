// English descriptions of 2014 (SRD 5.1) racial traits, keyed by trait id.
//
// `dnd5e/races.ts` only lists trait ids — the actual rule text never
// existed anywhere in the app, in any language. Step2Race.vue rendered a
// name with nothing under it, which srdText.ts (correctly) reported as
// "the SRD has no description for this entry" — but the SRD does describe
// every one of these, the app just never transcribed it. This file closes
// that gap for the base D&D races; Brancalonia and Apocalisse keep their
// own trait text in `_brancaTraitDescriptions` / `_apoTraitDescriptions`.
//
// Text below paraphrases the SRD 5.1 (CC-BY-4.0) rule for each trait, not a
// verbatim quote. Italian has no translation of these yet, so `getTraitDescription`
// serves this English text to Italian readers too, labelled "English only"
// by srdText.ts — the same treatment background and 2014-subclass features
// already get when no Italian text exists.
export const dnd5eTraitDescriptions: Record<string, string> = {
  'artificers-lore':
    "Whenever you make an Intelligence (History) check related to magic items, alchemical objects, or technological devices, you can add twice your proficiency bonus, instead of any proficiency bonus you normally apply.",
  'brave':
    'You have advantage on saving throws against being frightened.',
  'breath-weapon':
    "You can use your action to exhale destructive energy in a shape and damage type set by your draconic ancestry. Each creature in the area makes a saving throw, taking damage on a failure and half as much on a success. You can't use this again until you finish a short or long rest.",
  'cantrip':
    'You know one cantrip of your choice from the wizard spell list. Intelligence is your spellcasting ability for it.',
  'damage-resistance':
    'You have resistance to the damage type associated with your draconic ancestry.',
  'darkvision':
    "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
  'draconic-ancestry':
    'You have draconic ancestry. Choose a dragon type; it determines the damage type of your breath weapon and damage resistance trait.',
  'drow-magic':
    'You know the dancing lights cantrip. At 3rd level you can cast faerie fire once per long rest, and at 5th level you can also cast darkness once per long rest. Charisma is your spellcasting ability for these spells.',
  'drow-weapon-training':
    'You have proficiency with rapiers, shortswords, and hand crossbows.',
  'dwarven-armor-training':
    'You have proficiency with light and medium armor.',
  'dwarven-combat-training':
    'You have proficiency with the battleaxe, handaxe, light hammer, and warhammer.',
  'dwarven-resilience':
    'You have advantage on saving throws against poison, and you have resistance to poison damage.',
  'dwarven-toughness':
    'Your hit point maximum increases by 1, and it increases by 1 again every time you gain a level.',
  'elf-weapon-training':
    'You have proficiency with the longsword, shortsword, shortbow, and longbow.',
  'extra-language':
    'You can speak, read, and write one extra language of your choice.',
  'fey-ancestry':
    "You have advantage on saving throws against being charmed, and magic can't put you to sleep.",
  'fleet-of-foot':
    'Your base walking speed increases to 35 feet.',
  'gnome-cunning':
    'You have advantage on all Intelligence, Wisdom, and Charisma saving throws against magic.',
  'halfling-nimbleness':
    'You can move through the space of any creature that is of a size larger than yours.',
  'hellish-resistance':
    'You have resistance to fire damage.',
  'infernal-legacy':
    'You know the thaumaturgy cantrip. At 3rd level you can cast hellish rebuke once per long rest as a 2nd-level spell, and at 5th level you can also cast darkness once per long rest. Charisma is your spellcasting ability for these spells.',
  'keen-senses':
    'You have proficiency in the Perception skill.',
  'lucky':
    'When you roll a 1 on an attack roll, ability check, or saving throw, you can reroll the die and must use the new roll.',
  'mask-of-the-wild':
    'You can attempt to hide even when you are only lightly obscured by foliage, heavy rain, falling snow, mist, or other natural phenomena.',
  'menacing':
    'You have proficiency in the Intimidation skill.',
  'natural-illusionist':
    'You know the minor illusion cantrip. Intelligence is your spellcasting ability for it.',
  'naturally-stealthy':
    'You can attempt to hide even when you are obscured only by a creature that is at least one size larger than you.',
  'relentless-endurance':
    "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this again until you finish a long rest.",
  'savage-attacks':
    'When you score a critical hit with a melee weapon attack, you can roll one additional weapon damage die and add it to the extra damage of the critical hit.',
  'skill-versatility':
    'You gain proficiency in two skills of your choice.',
  'speak-with-small-beasts':
    'Through sounds and gestures, you can communicate simple ideas with Small or smaller beasts.',
  'stonecunning':
    'Whenever you make an Intelligence (History) check related to the origin of stonework, you are considered proficient in the History skill and add double your proficiency bonus to the check, instead of your normal proficiency bonus.',
  'stout-resilience':
    'You have advantage on saving throws against poison, and you have resistance to poison damage.',
  'sunlight-sensitivity':
    'You have disadvantage on attack rolls and on Wisdom (Perception) checks that rely on sight when you, the target of your attack, or whatever you are trying to perceive is in direct sunlight.',
  'superior-darkvision':
    'Your darkvision has a radius of 120 feet.',
  'tinker':
    "You have proficiency with tinker's tools. Using them, you can spend 1 hour and 10 gp of materials to construct a tiny clockwork device, such as a clockwork toy, fire starter, or music box.",
  'tool-proficiency':
    "You gain proficiency with one type of artisan's tools of your choice: smith's tools, brewer's supplies, or mason's tools.",
  'trance':
    "Elves don't need to sleep. Instead, they meditate deeply for 4 hours a day. After resting this way, you gain the same benefit a human would from 8 hours of sleep.",
}
