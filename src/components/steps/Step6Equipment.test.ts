import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createI18n } from 'vue-i18n'
import { setActivePinia, createPinia } from 'pinia'
import { useCharacterStore } from '@/stores/character'
import type { GameVariant } from '@/stores/app'
import { getEquipment, preloadVariantData } from '@/data'
import Step6Equipment from './Step6Equipment.vue'

// Con locale 'en' e messaggi vuoti i nomi delle armi e delle armature restano
// quelli dei dati, quindi i pulsanti si trovano per nome.
const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en: {} },
  missingWarn: false,
  fallbackWarn: false,
})

function mountForClass(variant: GameVariant, className: string) {
  const store = useCharacterStore()
  store.character.variant = variant
  store.character.className = className
  const wrapper = mount(Step6Equipment, { global: { plugins: [i18n] } })
  return { store, wrapper }
}

type Wrapper = ReturnType<typeof mountForClass>['wrapper']

function armorButtons(wrapper: Wrapper) {
  return wrapper.find('[aria-label="equipment.armor"]').findAll('button')
}

describe('passo Equipaggiamento — la scheda caricata non viene cancellata', () => {
  beforeAll(async () => {
    await preloadVariantData('dnd5e')
  })
  beforeEach(() => setActivePinia(createPinia()))

  it('mostra come già scelti armatura e scudo del personaggio', async () => {
    const eq = getEquipment('dnd5e')
    const worn = eq.armor[1]!
    setActivePinia(createPinia())
    const store = useCharacterStore()
    store.character.variant = 'dnd5e'
    store.character.armor = worn.name
    store.character.shield = true

    const wrapper = mount(Step6Equipment, { global: { plugins: [i18n] } })
    const buttons = armorButtons(wrapper)
    const checked = buttons.filter(b => b.attributes('aria-checked') === 'true')
    expect(checked.map(b => b.text().split(' (')[0])).toEqual([worn.name])
    // L'ultimo pulsante del gruppo è lo scudo
    expect(buttons[buttons.length - 1]!.attributes('aria-pressed')).toBe('true')
  })

})

describe('official PHB starting-equipment chooser', () => {
  beforeAll(async () => {
    await preloadVariantData('dnd5e')
    await preloadVariantData('brancalonia')
  })
  beforeEach(() => setActivePinia(createPinia()))

  it('auto-fills the first PHB option on a blank dnd5e character', () => {
    const { store } = mountForClass('dnd5e', 'fighter')

    // Chain mail; a longsword and shield; a light crossbow and 20 bolts;
    // the Dungeoneer's Pack — all four PHB choice lines default to option A.
    expect(store.character.armor).toBe('Chain Mail')
    expect(store.character.weapons.map(w => w.name)).toEqual(['Longsword', 'Light Crossbow'])
    expect(store.character.shield).toBe(true)
    expect(store.character.equipment).toContain("Dungeoneer's Pack")
  })

  it('switching the armor option swaps armor and its weapon, keeping the rest', async () => {
    const { store, wrapper } = mountForClass('dnd5e', 'fighter')
    const radiogroups = wrapper.findAll('[role="radiogroup"]')
    const armorChoiceButtons = radiogroups[0]!.findAll('button')

    await armorChoiceButtons[1]!.trigger('click')

    expect(store.character.armor).toBe('Leather')
    // The longsword and crossbow from the other two choice lines must survive.
    expect(store.character.weapons.map(w => w.name)).toEqual(['Longsword', 'Light Crossbow', 'Longbow'])
    expect(store.character.equipment).toContain('20 arrows')
  })

  it('does not touch an already-equipped character on mount', () => {
    const store = useCharacterStore()
    store.character.variant = 'dnd5e'
    store.character.className = 'fighter'
    store.character.armor = 'Studded Leather'
    store.character.armorId = 'studded-leather'

    mount(Step6Equipment, { global: { plugins: [i18n] } })

    expect(store.character.armor).toBe('Studded Leather')
  })

  it('renders class-specific choice lines, not a fixed template', () => {
    const { wrapper: fighterWrapper } = mountForClass('dnd5e', 'fighter')
    const { wrapper: wizardWrapper } = mountForClass('dnd5e', 'wizard')

    // Wizard's fixed Spellbook line has no fighter equivalent; fighter's
    // chooser has four choice lines where wizard has three.
    expect(wizardWrapper.text()).toContain('Spellbook')
    expect(fighterWrapper.text()).not.toContain('Spellbook')
    expect(fighterWrapper.findAll('[role="radiogroup"]').length)
      .not.toBe(wizardWrapper.findAll('[role="radiogroup"]').length)
  })

  it('stays off for Brancalonia even though it shares dnd5e class data', () => {
    const { wrapper } = mountForClass('brancalonia', 'fighter')
    expect(wrapper.find('#starting-equipment-heading').exists()).toBe(false)
    expect(wrapper.text()).not.toContain('Dungeoneer')
  })

  it('re-syncs internal weapon tracking to the loaded character without being remounted', async () => {
    const { store, wrapper } = mountForClass('dnd5e', 'fighter')

    // Simulate a hand-edited/imported weapon the chooser knows nothing
    // about, then save. The other PHB-granted gear (armor, shield, pack)
    // stays, only the weapon list is overwritten.
    store.character.weapons = [{ name: 'Dagger', attackBonus: 2, damage: '1d4' }]
    store.saveCharacter()
    const savedId = store.character.id

    // `<KeepAlive>` in BuilderView keeps the step mounted while the whole
    // character is swapped under it: an unrelated blank character appears
    // here first, then the saved one comes back.
    store.resetCharacter()
    store.character.variant = 'dnd5e'
    await wrapper.vm.$nextTick()

    store.loadCharacter(savedId)
    await wrapper.vm.$nextTick()
    expect(store.character.weapons.map(w => w.name)).toEqual(['Dagger'])

    // If the internal weapon-tracking ref hadn't re-synced to the reloaded
    // character on this swap, this click would rebuild `character.weapons`
    // from a stale (empty) list and silently drop the Dagger.
    const radiogroups = wrapper.findAll('[role="radiogroup"]')
    await radiogroups[0]!.findAll('button')[1]!.trigger('click')

    expect(store.character.weapons.map(w => w.name)).toContain('Dagger')
  })
})

describe('armor proficiency filtering', () => {
  beforeAll(async () => {
    await preloadVariantData('dnd5e')
  })
  beforeEach(() => setActivePinia(createPinia()))

  it('hides armor and the shield button for a class with no armor proficiency', () => {
    const { wrapper } = mountForClass('dnd5e', 'wizard')

    // With empty i18n messages, missing keys render as their literal key
    // string (see armorButtons/aria-label convention above) — so the shield
    // button, if present, would show up as the raw "review.shieldBonus" text.
    expect(armorButtons(wrapper).length).toBe(0)
    expect(wrapper.text()).not.toContain('review.shieldBonus')
  })

  it('hides heavy armor for a class proficient only up to medium', () => {
    const { wrapper } = mountForClass('dnd5e', 'barbarian')
    const labels = armorButtons(wrapper).map(b => b.text())

    expect(labels.some(l => l.includes('Chain Mail'))).toBe(false)
    expect(labels.some(l => l.includes('Hide'))).toBe(true)
    // Barbarian is proficient with shields even without heavy armor.
    expect(wrapper.text()).toContain('review.shieldBonus')
  })

  it('shows the full catalog for a class proficient with everything', () => {
    const { wrapper } = mountForClass('dnd5e', 'fighter')
    const labels = armorButtons(wrapper).map(b => b.text())

    expect(labels.some(l => l.includes('Chain Mail'))).toBe(true)
    expect(labels.some(l => l.includes('Plate'))).toBe(true)
  })

  it('fails open (shows everything) when no class is resolved yet', () => {
    const store = useCharacterStore()
    store.character.variant = 'dnd5e'
    // className left blank, as if the step were reached out of order.
    const wrapper = mount(Step6Equipment, { global: { plugins: [i18n] } })

    expect(armorButtons(wrapper).length).toBeGreaterThan(1)
  })
})
