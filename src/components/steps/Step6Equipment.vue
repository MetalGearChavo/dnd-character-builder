<script setup lang="ts">
import { ref, computed, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useCharacterStore } from "@/stores/character";
import {
  modifier,
  proficiencyBonus,
  armorIdFromName,
} from "@/utils/calculations";
import { getEquipment, getClasses } from "@/data";
import { useGameTerms } from "@/composables/useGameTerms";
import { attaccoPerNome } from "@/domain/armi";
import { hasArmorProficiency } from "@/domain/armorProficiency";
import {
  resolveStartingEquipment,
  defaultSelections,
  diffEquipment,
  type StartingEquipmentEntry,
  type StartingEquipmentOption,
  type StartingEquipmentGrant,
  type ResolvedEquipment,
} from "@/domain/startingEquipment";
import VariantPromo from "@/components/shared/VariantPromo.vue";

const { t } = useI18n();
const characterStore = useCharacterStore();
const gt = useGameTerms();

const equipment = computed(() =>
  getEquipment(characterStore.character.variant),
);
const customEquipment = ref("");

// Semplici e marziali in un elenco solo: al calcolo del bonus serve trovare
// l'arma per nome, e la categoria non cambia il conto.
const catalogoArmi = computed(() => [
  ...(equipment.value?.simpleWeapons || []),
  ...(equipment.value?.martialWeapons || []),
]);

// Armatura e scudo non hanno una copia locale: si leggono e si scrivono
// direttamente sul personaggio. Una copia in più sarebbe stato un secondo
// percorso da tenere allineato, ed era proprio il disallineamento il difetto.
// Le armi la copia ce l'hanno perché qui servono come soli nomi, mentre
// `character.weapons` porta anche bonus e danno, ricalcolati a ogni tocco.
const selectedWeapons = ref<string[]>([]);

function restoreWeapons() {
  selectedWeapons.value = characterStore.character.weapons.map((w) => w.name);
}
restoreWeapons();

// `<KeepAlive>` in BuilderView non rimonta il passo fra un avanti e un indietro,
// ma caricare una scheda salvata, rientrare nel builder o importare un JSON
// sostituisce l'intero personaggio: partendo da un elenco vuoto il primo clic
// riscriveva `character.weapons` da zero, cancellando le armi già scelte.
watch(
  () => characterStore.character.id,
  () => restoreWeapons(),
);

function updateCharacterWeapons() {
  const currentByName = new Map(
    characterStore.character.weapons.map((w) => [w.name, w]),
  );
  characterStore.character.weapons = selectedWeapons.value.map((name) => {
    // La regola del bonus di attacco sta in `src/domain/armi.ts` e non qui:
    // quando era scritta anche qui, il generatore casuale ne teneva una
    // versione diversa, e lo stesso personaggio otteneva numeri diversi a
    // seconda che fosse stato creato a mano o tirato a sorte.
    const bonuses = characterStore.character.racialBonuses;
    const scores = characterStore.character.abilityScores;
    return attaccoPerNome(
      name,
      catalogoArmi.value,
      {
        strMod: modifier(scores.str + (bonuses.str || 0)),
        dexMod: modifier(scores.dex + (bonuses.dex || 0)),
        proficiencyBonus: proficiencyBonus(characterStore.character.level),
        // Arti Marziali: col bastone ferrato o la spada corta il monaco tira di
        // Destrezza, pur non essendo armi accurate.
        artiMarziali: characterStore.character.className === "monk",
      },
      currentByName.get(name)?.magicBonus,
    );
  });
}

function selectArmor(armorName: string) {
  characterStore.character.armor = armorName;
  // Lo slug va scritto insieme al nome: è quello che leggerà chi riceve un
  // export, e un armorId rimasto indietro varrebbe meno di non averlo.
  characterStore.character.armorId = armorIdFromName(armorName);
}

function toggleShield() {
  characterStore.character.shield = !characterStore.character.shield;
}

function addCustomItem() {
  if (customEquipment.value.trim()) {
    characterStore.character.equipment.push(customEquipment.value.trim());
    customEquipment.value = "";
  }
}

function removeItem(idx: number) {
  characterStore.character.equipment.splice(idx, 1);
}

const currentClass = computed(() =>
  getClasses(characterStore.character.variant).find(
    (c) => c.id === characterStore.character.className,
  ),
);

// Proficiency is enforced nowhere else in the app (not in the AC math, not
// in Review) — without this filter a Wizard could freely pick Plate. Fails
// open (shows everything) when no class is resolved yet, rather than
// hiding the whole section on an odd KeepAlive state.
const proficientArmor = computed(() => {
  const list = equipment.value?.armor ?? [];
  const profs = currentClass.value?.armorProficiencies;
  if (!profs) return list;
  return list.filter((arm) => hasArmorProficiency(profs, arm.type));
});

const hasShieldProficiency = computed(() => {
  const profs = currentClass.value?.armorProficiencies;
  return !profs || hasArmorProficiency(profs, "shield");
});

// The official PHB chooser is dnd5e-only. Brancalonia and Apocalisse reuse
// the exact same CharacterClass objects from `classes.ts` (see getClasses in
// src/data/index.ts), so `startingEquipmentChoices` is present on their data
// too — this check is what actually keeps the chooser off for those variants.
const startingChoices = computed<StartingEquipmentEntry[]>(() => {
  if (characterStore.character.variant !== "dnd5e") return [];
  return currentClass.value?.startingEquipmentChoices
    ? [...currentClass.value.startingEquipmentChoices]
    : [];
});

const startingSelections = ref<number[]>([]);
let lastApplied: ResolvedEquipment = {
  weapons: [],
  armor: null,
  shield: false,
  items: [],
};

function characterEquipmentIsBlank(): boolean {
  const c = characterStore.character;
  return (
    c.weapons.length === 0 && !c.armor && !c.shield && c.equipment.length === 0
  );
}

function currentResolution(): ResolvedEquipment {
  return resolveStartingEquipment(
    startingChoices.value,
    startingSelections.value,
    equipment.value?.packs ?? [],
  );
}

// Applies only the delta between two resolutions, so re-picking an option
// never touches a weapon/armor/item the player added by hand under a
// different name — only what this chooser itself granted last time.
function applyStartingEquipmentDiff(
  prev: ResolvedEquipment,
  next: ResolvedEquipment,
) {
  const diff = diffEquipment(prev, next);

  for (const name of diff.weaponsRemove) {
    const idx = selectedWeapons.value.indexOf(name);
    if (idx >= 0) selectedWeapons.value.splice(idx, 1);
  }
  for (const name of diff.weaponsAdd) {
    if (!selectedWeapons.value.includes(name)) selectedWeapons.value.push(name);
  }
  if (diff.weaponsAdd.length || diff.weaponsRemove.length)
    updateCharacterWeapons();

  if (diff.armorChange) {
    if (diff.armorChange.to) {
      selectArmor(diff.armorChange.to);
    } else if (characterStore.character.armor === diff.armorChange.from) {
      characterStore.character.armor = "";
      characterStore.character.armorId = "";
    }
  }

  if (diff.shieldChange) {
    if (diff.shieldChange.to) {
      characterStore.character.shield = true;
    } else if (characterStore.character.shield === diff.shieldChange.from) {
      characterStore.character.shield = false;
    }
  }

  for (const item of diff.itemsRemove) {
    const idx = characterStore.character.equipment.indexOf(item);
    if (idx >= 0) characterStore.character.equipment.splice(idx, 1);
  }
  for (const item of diff.itemsAdd) {
    if (!characterStore.character.equipment.includes(item))
      characterStore.character.equipment.push(item);
  }

  lastApplied = next;
}

function emptyResolution(): ResolvedEquipment {
  return { weapons: [], armor: null, shield: false, items: [] };
}

// A different character replaced this one under `<KeepAlive>` (loaded a
// save, imported a JSON, started a new sheet). Only auto-fills when the
// incoming character is completely blank — a loaded save must never be
// overwritten, exactly like `restoreWeapons` does for the weapons list above.
function resetForCharacterChange() {
  startingSelections.value = defaultSelections(startingChoices.value);
  lastApplied = emptyResolution();
  if (startingChoices.value.length === 0) return;
  if (characterEquipmentIsBlank()) {
    applyStartingEquipmentDiff(lastApplied, currentResolution());
  }
}
resetForCharacterChange();

// `<KeepAlive>` keeps this component mounted while the wizard moves between
// steps, so going back to Step3Class/Step1Variant and changing class must
// retract whatever THIS chooser granted for the old class and apply the new
// class's defaults — unlike `resetForCharacterChange` above, this always
// runs the diff (the character is never blank at this point, that was the
// bug: switching Barbarian → Wizard left `two handaxes`/`four javelins`/
// `explorer pack` stuck in Other Equipment because nothing ever retracted
// them). `applyStartingEquipmentDiff` only touches what `lastApplied` says
// this chooser granted, so anything the player added by hand survives.
function syncForClassChange() {
  const newSelections = defaultSelections(startingChoices.value);
  const next = resolveStartingEquipment(
    startingChoices.value,
    newSelections,
    equipment.value?.packs ?? [],
  );
  applyStartingEquipmentDiff(lastApplied, next);
  startingSelections.value = newSelections;
}

// `character.id` and `variant`/`className` are watched together, not
// separately: loading a saved character changes BOTH in the same tick (the
// character being replaced under KeepAlive usually has a different class),
// and two independent watchers would both fire — the class-change one
// wrongly re-applying its diff on top of a reload it had nothing to do
// with. Tracking the last-seen id lets one callback tell "a different
// character arrived" (full reset) apart from "same character, class
// changed" (retract-and-reapply).
let lastSeenCharacterId = characterStore.character.id;
watch(
  () =>
    `${characterStore.character.id}:${characterStore.character.variant}:${characterStore.character.className}`,
  () => {
    const idChanged = characterStore.character.id !== lastSeenCharacterId;
    lastSeenCharacterId = characterStore.character.id;
    if (idChanged) {
      resetForCharacterChange();
    } else {
      syncForClassChange();
    }
  },
);

function selectStartingOption(entryIdx: number, optionIdx: number) {
  const prev = lastApplied;
  const nextSelections = [...startingSelections.value];
  nextSelections[entryIdx] = optionIdx;
  startingSelections.value = nextSelections;
  applyStartingEquipmentDiff(prev, currentResolution());
}

function grantLabel(grant: StartingEquipmentGrant): string {
  switch (grant.kind) {
    case "weapon":
      return gt.weapon(grant.name);
    case "armor":
      return gt.armorName(grant.name);
    case "shield":
      return t("review.shieldBonus");
    case "pack":
      return gt.pack(grant.name);
    case "item":
      return gt.equipment(grant.name);
  }
}

function optionLabel(option: StartingEquipmentOption): string {
  return option.grants.map(grantLabel).join(" + ");
}

function fixedLabel(entry: StartingEquipmentEntry): string {
  return (entry.fixed ?? []).map(grantLabel).join(", ");
}
</script>

<template>
  <section aria-labelledby="equipment-heading">
    <h2 id="equipment-heading" class="text-2xl font-bold text-amber-500 mb-6">
      {{ t("equipment.title") }}
    </h2>

    <!-- Starting Equipment (official PHB choices, dnd5e only) -->
    <div
      v-if="startingChoices.length"
      class="mb-6"
      aria-labelledby="starting-equipment-heading"
    >
      <h3
        id="starting-equipment-heading"
        class="text-lg font-semibold text-stone-300 mb-3"
      >
        {{ t("equipment.startingEquipment") }}
      </h3>
      <div v-for="(entry, idx) in startingChoices" :key="idx" class="mb-3">
        <p v-if="entry.fixed?.length" class="text-sm text-stone-400 mb-1">
          {{ fixedLabel(entry) }}
        </p>
        <div
          v-if="entry.choose?.length"
          class="flex flex-wrap gap-2"
          role="radiogroup"
          :aria-label="t('equipment.chooseOne')"
        >
          <button
            v-for="(option, optIdx) in entry.choose"
            :key="optIdx"
            @click="selectStartingOption(idx, optIdx)"
            class="px-3 py-1 rounded text-xs transition-colors cursor-pointer"
            :class="
              startingSelections[idx] === optIdx
                ? 'bg-amber-600 text-stone-900 font-medium'
                : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
            "
            role="radio"
            :aria-checked="startingSelections[idx] === optIdx"
          >
            {{ optionLabel(option) }}
          </button>
        </div>
      </div>
    </div>

    <!-- Armor -->
    <div class="mb-6">
      <h3 id="armor-heading" class="text-lg font-semibold text-stone-300 mb-3">
        {{ t("equipment.armor") }}
      </h3>
      <div
        class="flex flex-wrap gap-2"
        role="radiogroup"
        :aria-label="t('equipment.armor')"
      >
        <button
          v-for="arm in proficientArmor"
          :key="arm.name"
          @click="selectArmor(arm.name)"
          class="px-3 py-1 rounded text-xs transition-colors cursor-pointer"
          :class="
            characterStore.character.armor === arm.name
              ? 'bg-amber-600 text-stone-900 font-medium'
              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
          "
          role="radio"
          :aria-checked="characterStore.character.armor === arm.name"
        >
          {{ gt.armorName(arm.name) }} ({{ t("review.ac") }} {{ arm.baseAC }})
        </button>
        <button
          v-if="hasShieldProficiency"
          @click="toggleShield()"
          class="px-3 py-1 rounded text-xs transition-colors cursor-pointer"
          :class="
            characterStore.character.shield
              ? 'bg-amber-600 text-stone-900 font-medium'
              : 'bg-stone-700 text-stone-300 hover:bg-stone-600'
          "
          :aria-pressed="characterStore.character.shield"
        >
          {{ t("review.shieldBonus") }}
        </button>
      </div>
    </div>

    <!-- Coins -->
    <div class="mb-6">
      <h3 class="text-lg font-semibold text-stone-300 mb-3">
        {{ t("equipment.coins") }}
      </h3>
      <div class="flex gap-4" role="group" :aria-label="t('equipment.coins')">
        <div
          v-for="coin in ['gp', 'sp', 'cp'] as const"
          :key="coin"
          class="flex items-center gap-1"
        >
          <label
            :for="`coin-${coin}`"
            class="text-xs text-stone-400 uppercase"
            >{{ coin }}</label
          >
          <input
            :id="`coin-${coin}`"
            type="number"
            v-model.number="characterStore.character.coins[coin]"
            min="0"
            class="w-16 bg-stone-700 text-stone-200 rounded px-2 py-1 text-sm text-center"
            :aria-label="`${coin.toUpperCase()}`"
          />
        </div>
      </div>
    </div>

    <!-- Custom Equipment -->
    <div>
      <h3
        id="other-equipment-heading"
        class="text-lg font-semibold text-stone-300 mb-3"
      >
        {{ t("equipment.other") }}
      </h3>
      <div class="flex gap-2 mb-3">
        <label for="custom-equipment" class="sr-only">{{
          t("equipment.addItem")
        }}</label>
        <input
          id="custom-equipment"
          v-model="customEquipment"
          @keyup.enter="addCustomItem"
          class="flex-1 bg-stone-700 text-stone-200 rounded px-3 py-1 text-sm"
          :placeholder="t('equipment.addItem')"
        />
        <button
          @click="addCustomItem"
          :aria-label="t('equipment.addItem')"
          class="px-3 py-1 bg-amber-600 hover:bg-amber-500 text-stone-900 rounded text-sm font-medium cursor-pointer"
        >
          +
        </button>
      </div>
      <ul
        class="flex flex-wrap gap-2"
        role="list"
        :aria-label="t('equipment.other')"
      >
        <li
          v-for="(item, idx) in characterStore.character.equipment"
          :key="idx"
          class="px-2 py-1 bg-stone-700 rounded text-xs text-stone-300 flex items-center gap-1"
        >
          {{ item }}
          <button
            @click="removeItem(idx)"
            class="text-stone-500 hover:text-red-400 cursor-pointer"
            :aria-label="`${t('common.remove')} ${item}`"
          >
            &times;
          </button>
        </li>
      </ul>
    </div>

    <VariantPromo :variant="characterStore.character.variant" />
  </section>
</template>
