// Il testo italiano di una voce di regole, e cosa fare quando non c'è.
//
// L'app traduce da sempre i **nomi** di tutto (`src/i18n/gameTerms.ts`) e i
// **testi** dei privilegi delle classi base (`classes-it.ts`). Restavano fuori
// tre categorie, e ognuna sbagliava a modo suo:
//
//  · i **tratti razziali** non hanno testo in nessuna lingua, e la pagina
//    Razza mostrava il solo nome, senza dire che il resto non esiste;
//  · i **privilegi di background** hanno solo il testo inglese, e la pagina
//    Background lo stampava così com'è, in mezzo a un'interfaccia italiana,
//    senza dichiararlo;
//  · i **privilegi di sottoclasse del 2014** sono nella stessa condizione, e
//    il passo Classe faceva lo stesso.
//
// Da qui i tre stati. `soloInglese` non è un ripiego silenzioso: è un'etichetta
// che l'interfaccia deve mostrare, perché chi legge sappia che quel paragrafo
// è la fonte inglese e non una traduzione. E dove l'SRD italiano non ha il
// testo nessuno lo inventa: la voce resta col suo nome e con il buco
// dichiarato. Un buco dichiarato è preferibile a un testo plausibile e non
// verificabile.

import { getFeatureDescription, getTraitDescription } from './index'
import { SRD_IT_DESCRIPTIONS } from './srd-it-descriptions'
import type { GameVariant } from '@/stores/app'

export type TestoSrd =
  /** C'è il testo nella lingua chiesta. */
  | { stato: 'presente', testo: string }
  /** Si chiedeva l'italiano; l'SRD ha solo l'inglese, ed è questo. */
  | { stato: 'soloInglese', testo: string }
  /** La fonte non descrive questa voce in nessuna lingua. */
  | { stato: 'assente' }

const ASSENTE: TestoSrd = { stato: 'assente' }

/**
 * L'edizione delle regole a cui appartiene una variante. Brancalonia e
 * Apocalisse costruiscono sul 2014 e ne condividono i testi, come già fa
 * `getFeatureDescription`.
 */
function edizione(variant: GameVariant): '2014' | '2024' {
  return variant === 'dnd2024' ? '2024' : '2014'
}

/**
 * L'id con cui l'SRD indicizza il privilegio di un background. Nei dati del
 * builder quel privilegio ha solo un nome; nei pacchetti SRD ha un id, ed è
 * lo slug del nome inglese. Ogni gruppo di caratteri non alfanumerici diventa
 * un trattino, apostrofi compresi: "Ship's Passage" → `ship-s-passage`, non
 * `ships-passage`. È la stessa regola che genera gli id nel pacchetto, e lo
 * script di importazione verifica voce per voce che le due forme coincidano —
 * quindi questa funzione non è un'ipotesi ma un invariante controllato.
 */
export function slugPrivilegioBackground(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/**
 * Il testo di un privilegio nella lingua richiesta (italiano o spagnolo),
 * scritto a mano o importato dall'SRD. Ritorna '' per ogni altra lingua, così
 * l'inglese non passa mai da qui spacciato per una traduzione.
 */
function testoProprio(variant: GameVariant, id: string, locale: string): string {
  if (!id) return ''
  if (locale === 'es') return getFeatureDescription(variant, id, 'es', '')
  if (locale !== 'it') return ''
  // I testi scritti a mano vincono: sono quelli che il resto dell'app usa, e
  // l'importatore si rifiuta di duplicarli.
  const aMano = getFeatureDescription(variant, id, 'it', '')
  if (aMano) return aMano
  return SRD_IT_DESCRIPTIONS[edizione(variant)][id] ?? ''
}

function esito(locale: string, testoTradotto: string, testoEn: string): TestoSrd {
  if (locale !== 'it' && locale !== 'es') return testoEn ? { stato: 'presente', testo: testoEn } : ASSENTE
  if (testoTradotto) return { stato: 'presente', testo: testoTradotto }
  return testoEn ? { stato: 'soloInglese', testo: testoEn } : ASSENTE
}

/**
 * Il testo di un privilegio di classe o di sottoclasse. `testoEn` è la
 * descrizione inglese che sta nei dati, quando c'è. L'italiano copre classi
 * base, Brancalonia e Apocalisse; lo spagnolo per ora solo le classi base di
 * dnd5e e dnd2024 (`classes-es.ts`), via `getFeatureDescription`.
 */
export function testoPrivilegio(
  variant: GameVariant,
  featureId: string,
  locale: string,
  testoEn: string,
): TestoSrd {
  return esito(locale, testoProprio(variant, featureId, locale), testoEn.trim())
}

/**
 * Il testo di un tratto razziale. Nei dati il tratto è un solo id, senza
 * descrizione: l'inglese, quando esiste, sta nelle mappe di Brancalonia e
 * Apocalisse, che i loro manuali descrivono in entrambe le lingue.
 */
export function testoTratto(
  variant: GameVariant,
  traitId: string,
  locale: string,
): TestoSrd {
  if (!traitId) return ASSENTE
  const testoEn = getTraitDescription(variant, traitId, 'en').trim()
  if (locale !== 'it' && locale !== 'es') return esito(locale, '', testoEn)

  // I testi scritti a mano dei privilegi vincono anche qui, ma solo in
  // italiano: non esiste ancora un dizionario di privilegi scritti a mano in
  // spagnolo condiviso con i tratti.
  if (locale === 'it') {
    const aMano = testoProprio(variant, traitId, 'it')
    if (aMano) return { stato: 'presente', testo: aMano }
  }
  // `getTraitDescription` ripiega da sé sull'inglese quando la lingua richiesta
  // manca: per distinguere una traduzione vera da quel ripiego si confrontano
  // le due rese. Vale sia per le mappe it/en di Brancalonia e Apocalisse sia
  // per lo spagnolo di dnd5e (raceTraits-es.ts) — dnd2024 e Brancalonia/
  // Apocalisse non hanno ancora un tratto in spagnolo, quindi ci ricadono.
  const reso = getTraitDescription(variant, traitId, locale).trim()
  if (reso && reso !== testoEn) return { stato: 'presente', testo: reso }
  return testoEn ? { stato: 'soloInglese', testo: testoEn } : ASSENTE
}

/**
 * Il testo del privilegio concesso da un background. Il builder lo tiene per
 * nome e con la sola descrizione inglese; la traduzione, se e quando l'SRD la
 * darà, arriva per id.
 *
 * `testoTradottoGiaRisolto` è il testo nella lingua richiesta che il chiamante
 * ha già trovato per altra via. Serve al 2024, dove il privilegio del
 * background **è** il talento d'origine e il suo testo sta nel catalogo dei
 * talenti (`dnd2024/feats-it.ts` / `feats-es.ts`), che questo modulo non
 * importa per non trascinarlo in ogni passo del wizard.
 */
export function testoPrivilegioBackground(
  variant: GameVariant,
  featureName: string,
  locale: string,
  testoEn: string,
  testoTradottoGiaRisolto = '',
): TestoSrd {
  const id = slugPrivilegioBackground(featureName)
  return esito(locale, testoProprio(variant, id, locale) || testoTradottoGiaRisolto.trim(), testoEn.trim())
}
