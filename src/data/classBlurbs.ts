import type { GameVariant } from '@/stores/app'

/**
 * Due o tre righe mostrate sulla card di scelta della classe.
 *
 * Brancalonia e Apocalisse rinominano le classi base di D&D con il nome della
 * loro sottoclasse d'ambientazione — il barbaro diventa "Pagano", il guerriero
 * diventa "Furioso" — quindi il testo va per variante: chi sceglie fra un
 * Monaco dei Sette Sigilli e un Furioso non sta scegliendo fra un monaco e un
 * guerriero generici.
 *
 * Le chiavi sono gli id delle classi base di D&D.
 */
const dnd5e: Record<string, string> = {
  barbarian:
    'Entra in ira e incassa: resistenza ai colpi, d12 di vita e nessuna armatura da indossare. Il muro della prima fila, che colpisce più forte man mano che si arrabbia.',
  bard:
    'Combatte con la parola e la musica: ispira i compagni con un dado da aggiungere ai loro tiri, e lancia incantesimi da qualsiasi lista. Il jolly del gruppo.',
  cleric:
    'Canalizza il potere della sua divinità per curare, scacciare i non morti e menare le mani in armatura. Prepara ogni giorno gli incantesimi che gli servono.',
  druid:
    "Trasforma se stesso in bestia e piega la natura al proprio volere. L'unico che può passare la giornata come un orso e la sera lanciare un incantesimo.",
  fighter:
    'Il maestro d\'armi puro: più attacchi di chiunque altro, un\'azione in più quando serve, e la possibilità di ripetere i tiri salvezza falliti. Semplice ed efficace.',
  monk:
    'Combatte a mani nude incanalando il ki: raffiche di colpi, difesa senza armatura e la capacità di stordire un nemico con un tocco. Rapido e schivo.',
  paladin:
    'Guerriero votato a un giuramento: cura con le mani, protegge i compagni con la sua aura e scarica gli slot incantesimo in punizioni radiose devastanti.',
  ranger:
    'Cacciatore e battistrada: conosce un nemico e un territorio meglio di chiunque, combatte a distanza o con due armi, e lancia qualche incantesimo naturale.',
  rogue:
    "Colpisce dove fa male: attacco furtivo una volta per turno, il doppio della competenza nelle sue abilità, e un'azione bonus ogni turno per muoversi e sparire.",
  sorcerer:
    'La magia gli scorre nel sangue, non la studia. Pochi incantesimi, ma piegabili a piacere con la metamagia spendendo punti stregoneria.',
  warlock:
    'Ha stretto un patto con un\'entità ultraterrena. Pochi slot che si recuperano a ogni riposo breve, e le suppliche occulte che ne plasmano lo stile.',
  wizard:
    'Studia la magia sul libro degli incantesimi ed è quello che ne conosce di più. Fragile, ma nessuno ha la sua versatilità ai livelli alti.',
}

/**
 * Traducción española del mismo blurb, solo para las clases base de D&D
 * (`dnd5e`): Brancalonia y Apocalisse son ambientaciones de sabor italiano y
 * su texto sigue en italiano en cualquier idioma, igual que ya pasaba antes
 * de que existiera el español.
 */
const dnd5eEs: Record<string, string> = {
  barbarian:
    'Entra en cólera y aguanta el golpe: resistencia al daño, d12 de vida y ninguna armadura que ponerse. El muro de la primera línea, que golpea más fuerte cuanto más se enfada.',
  bard:
    'Combate con la palabra y la música: inspira a sus compañeros con un dado que sumar a sus tiradas, y lanza conjuros de cualquier lista. El comodín del grupo.',
  cleric:
    'Canaliza el poder de su divinidad para curar, expulsar a los no muertos y repartir mandobles con armadura puesta. Prepara cada día los conjuros que necesita.',
  druid:
    'Se transforma en bestia y doblega la naturaleza a su voluntad. El único capaz de pasar el día como un oso y, por la noche, lanzar un conjuro.',
  fighter:
    'El maestro de armas puro: más ataques que nadie, una acción extra cuando hace falta, y la posibilidad de repetir tiradas de salvación falladas. Simple y eficaz.',
  monk:
    'Combate a mano limpia canalizando el ki: ráfagas de golpes, defensa sin armadura y la capacidad de aturdir a un enemigo con un toque. Rápido y escurridizo.',
  paladin:
    'Guerrero consagrado a un juramento: cura con las manos, protege a sus compañeros con su aura y descarga espacios de conjuro en castigos radiantes devastadores.',
  ranger:
    'Cazador y batidor: conoce a un enemigo y un terreno mejor que nadie, combate a distancia o con dos armas, y lanza algún conjuro de la naturaleza.',
  rogue:
    'Golpea donde duele: ataque furtivo una vez por turno, el doble de su bonificador de competencia en sus habilidades, y una acción adicional cada turno para moverse y desaparecer.',
  sorcerer:
    'La magia le corre por la sangre, no la estudia. Pocos conjuros, pero moldeables a placer con la metamagia gastando puntos de hechicería.',
  warlock:
    'Ha sellado un pacto con una entidad de otro mundo. Pocos espacios de conjuro que se recuperan en cada descanso corto, y los ruegos ocultos que dan forma a su estilo.',
  wizard:
    'Estudia la magia en su libro de conjuros y es quien más conoce de todos. Frágil, pero nadie tiene su versatilidad a niveles altos.',
}

const brancalonia: Record<string, string> = {
  barbarian:
    "Il pagano vive dentro i confini del Regno da secoli e parla un Volgare perfetto, ma ha scelto l'Ira — o come la chiama lui, la Violenza — per risolvere le dispute.",
  bard:
    "L'arlecchino è la maschera della Commedia dell'Arte: sberleffi, piroette e batocchio. Distrae l'avversario ridendo e si difende senza armatura, con la faccia tosta.",
  cleric:
    'Il miracolaro tira giù i Santi del Calendario quando serve una mano: aggiunge la Saggezza a un tiro fallito, suo o di un compagno. Santo per acclamazione, non per nomina.',
  druid:
    'Il benandante protegge la gente da streghe, diavoli e fantasmi. Vede nel buio, sente i non morti e danza la Danza Macabra al confine fra i vivi e i morti.',
  fighter:
    'Lo spadaccino è il duellante di scuola: studia l\'avversario, combatte di zappa e pugnale e nel duello uno contro uno aggiunge la competenza ai danni.',
  monk:
    'Il frate degli Ordini Maneschi porge l\'altra guancia una volta sola, poi il mandato gli consente di difendersi. Combatte a mani nude usando la Forza al posto della Destrezza.',
  paladin:
    "Il cavaliere errante è l'aristocrazia dei pezzenti: nobile decaduto a cavallo di un ronzino, ispira i compagni e si erge a difesa di chi non può difendersi.",
  ranger:
    "Il mattatore cattura bestie e mostruosità e le combatte nelle arene. Sceglie una preda e per un minuto la colpisce più spesso, più forte e schivandola meglio.",
  rogue:
    'Il brigante è il ladro di strada e di campagna, per il popolo più campione che bandito. Maestro di agguati: vantaggio all\'iniziativa e a tutto il primo turno.',
  sorcerer:
    'Lo scaramante manipola la Fandonia delle fate e toglie il malocchio al bestiame. Tira un d20 in più e sceglie quale usare: il fato lo protegge di suo.',
  warlock:
    'Il menagramo trae potere da Madama Iattura. Con uno sguardo di traverso rovina il tiro salvezza di un nemico, e al 6° livello scatena una sfortuna che pagherà caro.',
  wizard:
    'Il guiscardo è mago e truffatore insieme: cerca tesori e reliquie, usa qualsiasi cianfrusaglia magica come focus e si sintonizza con un oggetto in più degli altri.',
  burattinaio:
    'Costruisce burattini di legno turchino e li anima con i Fili. Combatte per interposta marionetta, ma ogni ferita del burattino la incassa lui.',
}

const apocalisse: Record<string, string> = {
  barbarian:
    'Il barbaro del Martirio si tormenta le carni per trasformare il dolore in furia: si ferisce prima di attaccare e per quel turno colpisce molto più forte.',
  bard:
    'Il bardo della Rivelazione piange lacrime di sangue e ci legge dentro il futuro prossimo. Predice la sconfitta di un nemico, e a volte annulla il destino di un compagno.',
  cleric:
    'Il chierico della Rovina suona le campane della fine di ogni cosa: danni da tuono ad area, e la capacità di disintegrare materia e creature.',
  druid:
    'Il druido della Piaga incarna la Carestia, il terzo Cavaliere. Il suo corpo decade e contagia: chi lo tocca si ammala, e la sua Forma Selvatica è già malata.',
  fighter:
    "Il furioso assalta con armi enormi come lo spadone fiammeggiante. Attacca ad area chi lo circonda, rinuncia alla difesa per colpire più forte e non teme la morte.",
  monk:
    'Il monaco dei Sette Sigilli si innesta nel petto sfere mistiche, una per sigillo aperto: fulmine, fiamma, veleno, gelo, resurrezione, eclissi e silenzio.',
  rogue:
    "Lo spettro dell'Assenzio è imbevuto di un veleno innaturale: evoca una coltre di vapori in cui si nasconde, avvelena chi colpisce di furtivo e infine svanisce nella nebbia.",
  paladin:
    'Il paladino della Fine del Mondo mostra ai nemici la loro fine e li spaventa. La sua aura di sconcerto rallenta chi è terrorizzato e lo fa colpire più facilmente.',
  ranger:
    'Il baluardo è il cecchino di frontiera: colubrina e armatura pesante, prende la mira restando immobile e al 15° livello decide di infliggere un critico.',
  sorcerer:
    "Lo stregone di Discendenza Ultraterrena ha un angelo o un demone fra gli antenati: la scelta decide se i suoi danni saranno radiosi o necrotici, e gli fa spuntare le ali.",
  warlock:
    'La warlock del Patto di Lilith serve la Madre dei Demoni, che incarna libertà e ribellione. Vola, usa il Carisma per colpire con le armi e non può essere soggiogata.',
  wizard:
    'Il mago della Scuola di Salomone vincola e comanda gli spiriti ultraterreni: evoca immondi e celestiali, e si scherma dietro uno schermo cabalistico.',
}

// La variante 2024 porta il blurb sull'oggetto classe, perché i suoi
// privilegi sono diversi da quelli del 2014: qui non serve una mappa.
const BY_VARIANT: Record<GameVariant, Record<string, string>> = {
  dnd5e,
  dnd2024: {},
  brancalonia,
  apocalisse,
}

/**
 * Blurb della classe per la variante in corso, con ricaduta su quello di D&D.
 *
 * Lo spagnolo copre solo `dnd5e`: Brancalonia e Apocalisse restano in
 * italiano a qualunque lingua, come già succedeva prima che esistesse lo
 * spagnolo (sono ambientazioni di sapore italiano, non testo di regole).
 */
export function getClassBlurb(variant: GameVariant, classId: string, locale: string = 'it'): string | undefined {
  if (variant === 'dnd2024') return undefined
  if (locale === 'es' && variant === 'dnd5e') return dnd5eEs[classId]
  return BY_VARIANT[variant]?.[classId] ?? dnd5e[classId]
}
