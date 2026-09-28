// Testo integrale degli incantesimi in lingua non inglese, caricato su richiesta.
//
// I nomi degli incantesimi sono già tradotti in `src/i18n/gameTerms.ts`; qui
// c'è quello che mancava, cioè il testo che serve quando l'incantesimo si usa
// al tavolo. Le descrizioni inglesi dei dati (`dnd5e/spells.ts`) restano le
// prime frasi del manuale: bastano a costruire un personaggio, non a giocarlo.
//
// Il testo italiano viene dall'SRD italiano (5.1 per il 2014, 5.2.1 per il
// 2024), CC-BY-4.0 — l'attribuzione sta in DATA-SOURCES.md e nella pagina
// Crediti. Il testo spagnolo copre solo dnd5e (2014): non esiste ancora una
// traduzione per il 2024, quindi quella combinazione ricade sull'inglese,
// esattamente come già succede per Brancalonia e Apocalisse.
//
// WSG 3.3 + 3.8: sono centinaia di KB di prosa, il blocco di dati più grosso
// dell'applicazione. Non entra nel bundle iniziale e non entra nemmeno nel
// chunk degli incantesimi: ogni combinazione lingua/edizione sta in un modulo
// a sé, importato dinamicamente solo quando l'interfaccia usa quella lingua e
// solo dal passo che la mostra. Chi gioca in inglese non ne scarica nessuno.
//
// A differenza degli altri moduli dati, questi NON finiscono in localStorage:
// la cache serve a evitare un download, ma qui il round-trip JSON costerebbe
// più del parsing del modulo e mangerebbe da solo mezza quota del dominio.
// Il service worker li ha già in precache, che è la cache giusta per un file
// che non cambia mai fra un build e l'altro.

import type { GameVariant } from '@/stores/app'

/** Il testo di un incantesimo, come lo stampa l'SRD. */
export interface SpellTextIt {
  /** Corpo dell'incantesimo. I ritorni a capo separano i capoversi. */
  testo: string
  /**
   * Il capoverso «A livelli superiori» / «Usando uno slot di livello
   * superiore», quando l'incantesimo ce l'ha.
   */
  aLivelliSuperiori?: string
}

type MappaTesti = Record<string, SpellTextIt>

/** L'edizione dell'SRD da cui pescare il testo, per variante di gioco. */
export type SpellTextEdition = '2014' | '2024'

/** Le lingue per cui esiste testo integrale degli incantesimi. */
export type SpellTextLocale = 'it' | 'es'

/**
 * Brancalonia e Apocalisse girano sulle regole 2014 e riusano quella lista
 * incantesimi: prendono lo stesso testo di `dnd5e`. Gli incantesimi propri dei
 * due manuali di Acheron non stanno nell'SRD e restano senza voce qui — la
 * loro descrizione è già tradotta nei rispettivi dati.
 */
export function spellTextEdition(variant: GameVariant): SpellTextEdition {
  return variant === 'dnd2024' ? '2024' : '2014'
}

type Chiave = `${SpellTextLocale}-${SpellTextEdition}`

/**
 * Un caricatore per ogni combinazione lingua/edizione che esiste davvero.
 * Manca apposta `es-2024`: il 2024 non ha ancora una traduzione spagnola, e
 * quella combinazione deve ricadere sull'inglese senza tentare un import che
 * fallirebbe sempre.
 */
const caricatori: Partial<Record<Chiave, () => Promise<MappaTesti>>> = {
  'it-2014': () => import('./dnd5e/spells-it').then(m => m.dnd5eSpellTextsIt),
  'it-2024': () => import('./dnd2024/spells-it').then(m => m.dnd2024SpellTextsIt),
  'es-2014': () => import('./dnd5e/spells-es').then(m => m.dnd5eSpellTextsEs),
}

const testi: Partial<Record<Chiave, MappaTesti>> = {}
const inCorso: Partial<Record<Chiave, Promise<void>>> = {}

/** Carica (una volta sola) il testo dell'edizione e della lingua richieste. */
export function ensureSpellTexts(variant: GameVariant, locale: string): Promise<void> {
  const chiave = chiaveValida(locale, spellTextEdition(variant))
  if (!chiave) return Promise.resolve()
  if (testi[chiave]) return Promise.resolve()
  if (inCorso[chiave]) return inCorso[chiave]
  const promessa = caricatori[chiave]!().then(m => { testi[chiave] = m })
  // Un import fallito (rete giù, chunk scaduto) non deve bloccare per sempre
  // il passo incantesimi: si azzera la promessa e il tentativo dopo riprova.
  inCorso[chiave] = promessa.catch(() => { inCorso[chiave] = undefined })
  return inCorso[chiave]
}

/** Vero quando il testo dell'edizione e della lingua è in memoria. */
export function spellTextsLoaded(variant: GameVariant, locale: string): boolean {
  const chiave = chiaveValida(locale, spellTextEdition(variant))
  return chiave !== undefined && testi[chiave] !== undefined
}

/**
 * Il testo tradotto di un incantesimo, se c'è.
 *
 * Torna `undefined` — e chi chiama ricade sulla descrizione inglese — per le
 * lingue senza copertura (l'inglese stesso, o lo spagnolo sul 2024), per gli
 * incantesimi fuori SRD (*Blade Ward* e *Hex* nel 2014), per quelli di
 * Brancalonia e Apocalisse, e finché `ensureSpellTexts` non ha finito.
 */
export function getSpellText(variant: GameVariant, locale: string, spellId: string): SpellTextIt | undefined {
  const chiave = chiaveValida(locale, spellTextEdition(variant))
  return chiave ? testi[chiave]?.[spellId] : undefined
}

function chiaveValida(locale: string, edizione: SpellTextEdition): Chiave | undefined {
  const chiave = `${locale}-${edizione}` as Chiave
  return chiave in caricatori ? chiave : undefined
}
