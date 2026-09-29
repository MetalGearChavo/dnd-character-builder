// English descriptions of 2024 (SRD 5.2.1) species traits, keyed by trait id.
// Same gap and same fix as `dnd5e/raceTraits.ts` — see that file's header.
//
// For lineage/legacy/gift traits that branch into a 3rd/5th-level spell or a
// specific magical effect, this file names the part that's certain from the
// data already in `dnd2024/races.ts` (the cantrip, the resistance, the
// trigger) and describes the higher-level payoff generically rather than
// naming a specific spell from memory that can't be checked against the
// manual here — an approach `CLAUDE.md` asks for when a claim can't be verified.
export const dnd2024TraitDescriptions: Record<string, string> = {
  'adrenaline-rush':
    'You can take the Dash action as a Bonus Action, and when you do so, you gain a number of temporary hit points equal to your proficiency bonus. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.',
  'brave':
    'You have advantage on saving throws you make to avoid or end the frightened condition.',
  'breath-weapon':
    'When you take the Attack action on your turn, you can replace one of your attacks with an exhalation of destructive energy in a 15-foot cone or a 5-foot-wide, 30-foot line (your choice), dealing damage of the type tied to your draconic ancestry. Each creature in the area makes a Dexterity or Constitution saving throw (your choice), taking half damage on a success. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.',
  'damage-resistance-draconic':
    'You have resistance to the damage type associated with your draconic ancestry.',
  'darkvision-60':
    "You can see in dim light within 60 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
  'darkvision-120':
    "You can see in dim light within 120 feet of you as if it were bright light, and in darkness as if it were dim light. You can't discern color in darkness, only shades of gray.",
  'draconic-ancestry':
    'You have a draconic ancestor. Choose a dragon type; it sets the damage type of your Breath Weapon and the damage you resist.',
  'draconic-flight':
    "Starting at 5th level, you can use a Bonus Action to sprout spectral wings for 10 minutes, gaining a flying speed equal to your walking speed. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.",
  'dragonborn-black':
    'Your draconic ancestry is Black. Your Breath Weapon deals acid damage, and you have resistance to acid damage.',
  'dragonborn-blue':
    'Your draconic ancestry is Blue. Your Breath Weapon deals lightning damage, and you have resistance to lightning damage.',
  'dragonborn-brass':
    'Your draconic ancestry is Brass. Your Breath Weapon deals fire damage, and you have resistance to fire damage.',
  'dragonborn-bronze':
    'Your draconic ancestry is Bronze. Your Breath Weapon deals lightning damage, and you have resistance to lightning damage.',
  'dragonborn-copper':
    'Your draconic ancestry is Copper. Your Breath Weapon deals acid damage, and you have resistance to acid damage.',
  'dragonborn-gold':
    'Your draconic ancestry is Gold. Your Breath Weapon deals fire damage, and you have resistance to fire damage.',
  'dragonborn-green':
    'Your draconic ancestry is Green. Your Breath Weapon deals poison damage, and you have resistance to poison damage.',
  'dragonborn-red':
    'Your draconic ancestry is Red. Your Breath Weapon deals fire damage, and you have resistance to fire damage.',
  'dragonborn-silver':
    'Your draconic ancestry is Silver. Your Breath Weapon deals cold damage, and you have resistance to cold damage.',
  'dragonborn-white':
    'Your draconic ancestry is White. Your Breath Weapon deals cold damage, and you have resistance to cold damage.',
  'dwarven-resilience':
    'You have resistance to poison damage, and you have advantage on saving throws you make to avoid or end the poisoned condition.',
  'dwarven-toughness':
    'Your hit point maximum increases by 1, and it increases by 1 again every time you gain a level.',
  'elf-drow':
    'Drow Lineage: you know the dancing lights cantrip. At 3rd and 5th level you can cast an additional spell tied to this lineage, each once per Long Rest without a spell slot. Charisma is your spellcasting ability for these spells.',
  'elf-high-elf':
    'High Elf Lineage: you know the prestidigitation cantrip. At 3rd and 5th level you can cast an additional spell tied to this lineage, each once per Long Rest without a spell slot. Intelligence is your spellcasting ability for these spells.',
  'elf-wood-elf':
    'Wood Elf Lineage: you know the druidcraft cantrip, and your walking speed increases by 5 feet. At 3rd and 5th level you can cast an additional spell tied to this lineage, each once per Long Rest without a spell slot. Wisdom is your spellcasting ability for these spells.',
  'elven-lineage':
    'You have an elven lineage — Drow, High Elf, or Wood Elf — that grants a cantrip at 1st level and an additional spell at 3rd and 5th level, each castable once per Long Rest without a spell slot.',
  'fey-ancestry':
    "You have advantage on saving throws you make to avoid or end the charmed condition, and magic can't put you to sleep.",
  'fiendish-legacy':
    'You have a fiendish legacy — Abyssal, Chthonic, or Infernal — that grants resistance to a damage type and, at 3rd and 5th level, an additional spell you can cast once per Long Rest without a spell slot.',
  'giant-ancestry':
    "You have a Giant Ancestry that grants a magical gift. Choose one of six options — Cloud's Jaunt, Fire's Burn, Frost's Chill, Hill's Tumble, Stone's Endurance, or Storm's Thunder.",
  'gnome-forest-gnome':
    'Forest Gnome Lineage: you know the minor illusion cantrip and can speak with Small or smaller beasts. At 3rd and 5th level you can cast an additional spell tied to this lineage, each once per Long Rest without a spell slot. Intelligence is your spellcasting ability for these spells.',
  'gnome-rock-gnome':
    "Rock Gnome Lineage: you know the mending cantrip and have proficiency with Tinker's Tools, which you can use to build a tiny clockwork device. At 3rd and 5th level you can cast an additional spell tied to this lineage, each once per Long Rest without a spell slot. Intelligence is your spellcasting ability for these spells.",
  'gnomish-cunning':
    'You have advantage on Intelligence, Wisdom, and Charisma saving throws against spells and other magical effects.',
  'gnomish-lineage':
    'You have a gnomish lineage — Forest Gnome or Rock Gnome — that grants a cantrip at 1st level and an additional spell at 3rd and 5th level, each castable once per Long Rest without a spell slot.',
  'goliath-clouds-jaunt':
    "Cloud's Jaunt: when you take damage, you can use your Reaction to teleport up to 30 feet to an unoccupied space you can see. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.",
  'goliath-fires-burn':
    "Fire's Burn: when you hit a target with an attack roll, you can deal an extra 1d10 fire damage to it. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.",
  'goliath-frosts-chill':
    "Frost's Chill: when you hit a target with an attack roll, you can reduce its speed by 10 feet until the start of your next turn. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.",
  'goliath-hills-tumble':
    "Hill's Tumble: when you hit a target with an attack roll, you can force it to make a Strength saving throw or be knocked prone. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.",
  'goliath-stones-endurance':
    "Stone's Endurance: when you take damage, you can use your Reaction to reduce it by 1d12 plus your Constitution modifier. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.",
  'goliath-storms-thunder':
    "Storm's Thunder: when a creature within 60 feet of you hits you with an attack, you can use your Reaction to deal 1d8 thunder damage to it. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.",
  'halfling-nimbleness':
    "You can move through the space of any creature whose size is larger than yours, but you can't stop there.",
  'keen-senses':
    'You gain proficiency in the Insight, Perception, or Survival skill (choose one when you gain this trait).',
  'large-form':
    "Starting at 5th level, you can use a Bonus Action to become Large for 10 minutes if you aren't already that size. While Large, you have advantage on Strength checks, and your reach and speed increase by 5 feet. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.",
  'luck':
    'When you roll a 1 on the d20 of a d20 Test, you can reroll the die, and you must use the new roll.',
  'naturally-stealthy':
    'You can take the Hide action even when you are obscured only by a creature that is at least one size larger than you.',
  'otherworldly-presence':
    'You know the thaumaturgy cantrip. Charisma is your spellcasting ability for it.',
  'powerful-build':
    'You count as one size larger when determining your carrying capacity and the weight you can push, drag, or lift.',
  'relentless-endurance':
    "When you are reduced to 0 hit points but not killed outright, you can drop to 1 hit point instead. You can't use this again until you finish a Long Rest.",
  'resourceful':
    'You gain Heroic Inspiration whenever you finish a Long Rest.',
  'skillful':
    'You gain proficiency in one skill of your choice.',
  'stonecunning':
    'As a Bonus Action, you can magically give yourself Tremorsense with a range of 60 feet for 10 minutes, provided you are on ground made of stone or dirt. You can use this trait a number of times equal to your proficiency bonus, regaining all expended uses when you finish a Long Rest.',
  'tiefling-abyssal':
    'Abyssal Legacy: you have resistance to poison damage. At 3rd and 5th level you can cast an additional spell tied to this legacy, each once per Long Rest without a spell slot. Charisma is your spellcasting ability for these spells.',
  'tiefling-chthonic':
    'Chthonic Legacy: you have resistance to necrotic damage. At 3rd and 5th level you can cast an additional spell tied to this legacy, each once per Long Rest without a spell slot. Charisma is your spellcasting ability for these spells.',
  'tiefling-infernal':
    'Infernal Legacy: you have resistance to fire damage. At 3rd and 5th level you can cast an additional spell tied to this legacy, each once per Long Rest without a spell slot. Charisma is your spellcasting ability for these spells.',
  'trance':
    "You don't need to sleep, and magic can't force you to sleep. You can finish a Long Rest in 4 hours if you spend those hours in a trancelike meditation, during which you retain consciousness.",
  'versatile':
    'You gain an Origin feat of your choice, in addition to the one granted by your background.',
}
