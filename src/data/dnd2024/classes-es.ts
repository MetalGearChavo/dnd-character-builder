// Descripciones en español de los privilegios de clase y subclase de D&D 2024.
//
// Fuente terminológica: System Reference Document 5.2.1 y las convenciones
// habituales de las traducciones oficiales al español. Las distancias están
// en metros, como en el resto de la app, y la terminología es la del SRD:
// "salvación", "bonificador de competencia", "descanso corto/largo", "acción
// adicional", "puntos de golpe", "Maestría con armas", "Concentración de monje".
//
// CUIDADO CON LA EDICIÓN. Aquí estamos en 2024: la Ira dura hasta el final del
// siguiente turno y debe prolongarse, el monje gasta puntos de concentración
// y no ki, el Castigo divino del paladín es un conjuro, y cada clase elige
// subclase en el nivel 3. Las reglas de 2014 están en
// `../dnd5e/classes-es.ts` y no deben mezclarse con estas.
//
// Los NOMBRES de los privilegios no están aquí sino en `src/i18n/gameTerms.ts`
// (featureNamesEs): es un único mapa para toda la app, así el resumen y la
// ficha en PDF no pueden divergir de la lista de privilegios.
//
// Algunos id están compartidos por varias clases (`spellcasting`,
// `extra-attack`, `unarmored-defense`...): el mapa está indexado solo por id,
// así que esas entradas están escritas para valer para todas las clases que
// las usan.

/** Frase recurrente: la Mejora de puntuación de característica. */
const ASI =
  'El personaje obtiene el talento Mejora de puntuación de característica u otro talento a su elección del que cumpla los prerrequisitos. Este privilegio se vuelve a obtener en los niveles superiores indicados en la tabla de la clase.'

/** Frase recurrente: el privilegio concedido por la subclase en un nivel. */
const sub = (cls: string, lv: number) =>
  `El personaje obtiene el privilegio que su subclase de ${cls} concede en el nivel ${lv}.`

export const dnd2024FeatureDescriptionsEs: Record<string, string> = {
  // ═══ Privilegios comunes a varias clases ═══════════════════════════
  'ability-score-improvement': ASI,
  'ability-score-improvement-2': ASI,
  'ability-score-improvement-3': ASI,
  'ability-score-improvement-4': ASI,
  'ability-score-improvement-5': ASI,
  'ability-score-improvement-6': ASI,
  'epic-boon':
    'El personaje obtiene una Dádiva épica u otro talento a su elección del que cumpla los prerrequisitos. Las Dádivas épicas son los talentos reservados a los personajes que han alcanzado el nivel 19.',
  'extra-attack':
    'Cuando realiza la acción de Atacar en su turno, el personaje puede atacar dos veces en lugar de una.',
  spellcasting:
    'El personaje ha aprendido a lanzar conjuros. La tabla de su clase indica los trucos conocidos, el número de conjuros preparados y los espacios de conjuro disponibles; los espacios gastados se recuperan con un descanso largo, y la lista de conjuros preparados se puede modificar al obtener un nivel o al completar un descanso largo, según la clase. La característica de lanzamiento de conjuros es el Carisma para bardo, paladín y hechicero, la Sabiduría para clérigo, druida y explorador, la Inteligencia para el mago.',
  expertise:
    'El personaje obtiene Maestría en dos habilidades en las que ya tiene competencia: su bonificador de competencia se duplica en cualquier prueba de característica que use una de esas habilidades.',
  'unarmored-defense':
    'Mientras no lleve armadura, la Clase de Armadura base del personaje es igual a 10 más su modificador de Destreza y el modificador de la característica típica de su clase: Constitución para el bárbaro, que aun así puede portar un escudo, Sabiduría para el monje, que en cambio no debe portar ninguno.',
  'weapon-mastery':
    'El adiestramiento con las armas permite al personaje aprovechar la propiedad de maestría de ciertos tipos de armas sencillas o de guerra a su elección: dos para el bárbaro y para el pícaro, tres para el guerrero. Al final de cada descanso largo puede practicar y cambiar una de las armas elegidas, y en los niveles indicados en la tabla de la clase el número de armas aumenta.',
  'channel-divinity':
    'El personaje canaliza la energía divina de los Planos Exteriores para alimentar efectos mágicos. El clérigo comienza con Chispa divina y Ahuyentar no muertos, el paladín con Percepción de lo divino; otros privilegios añaden otros efectos. Dispone de dos usos: recupera uno con un descanso corto y todos con un descanso largo. Si un efecto exige una salvación, la CD es la de sus conjuros.',
  'fighting-style':
    'El personaje obtiene un talento Estilo de combate a su elección. El paladín puede elegir en su lugar Guerrero bendecido, que le enseña dos trucos de clérigo; el explorador puede elegir Guerrero druídico, que le enseña dos trucos de druida.',
  evasion:
    'Cuando está sujeto a un efecto que le permite hacer una salvación de Destreza para reducir el daño a la mitad, el personaje no sufre daño alguno si la supera y solo la mitad del daño si la falla. No se beneficia de este privilegio mientras esté incapacitado.',

  // ═══ Bárbaro ══════════════════════════════════════════════════════
  rage:
    'Como acción adicional, y siempre que no lleve armadura pesada, el bárbaro puede entrar en ira: obtiene resistencia a los daños contundentes, perforantes y cortantes, un bonificador al daño de los ataques que usan Fuerza y ventaja en las pruebas y salvaciones de Fuerza, pero no puede lanzar conjuros ni mantener la concentración. La ira dura hasta el final de su siguiente turno y debe prolongarse atacando a un enemigo, obligándolo a una salvación o gastando una acción adicional, hasta un máximo de 10 minutos.',
  'danger-sense':
    'El bárbaro percibe cuándo algo en los alrededores no es como debería ser: tiene ventaja en las salvaciones de Destreza, a menos que esté incapacitado.',
  'reckless-attack':
    'Cuando realiza la primera tirada de ataque de su turno, el bárbaro puede atacar de forma temeraria: hasta el inicio de su siguiente turno tiene ventaja en las tiradas de ataque que usan Fuerza, pero las tiradas de ataque contra él también tienen ventaja.',
  'barbarian-subclass':
    'El bárbaro elige una subclase de bárbaro, como la Senda del berserker, y obtiene sus privilegios en los niveles 3, 6, 10 y 14.',
  'primal-knowledge':
    'El bárbaro obtiene competencia en otra habilidad a elegir entre las disponibles para los bárbaros de nivel 1. Además, mientras la ira esté activa, puede hacer como pruebas de Fuerza las pruebas de Acrobacias, Intimidación, Percepción, Sigilo y Supervivencia.',
  'fast-movement':
    'La velocidad del bárbaro aumenta en 3 metros, siempre que no lleve armadura pesada.',
  'barbarian-subclass-feature': sub('bárbaro', 6),
  'feral-instinct':
    'Los instintos del bárbaro están tan afinados que le dan ventaja en las tiradas de iniciativa.',
  'instinctive-pounce':
    'Como parte de la acción adicional con la que entra en ira, el bárbaro puede moverse hasta la mitad de su velocidad.',
  'brutal-strike':
    'Si usa Ataque temerario, el bárbaro puede renunciar a la ventaja en una tirada de ataque basada en Fuerza, siempre que esa tirada no tenga desventaja. Si el golpe acierta, el objetivo sufre 1d10 daño extra del mismo tipo que el arma y el bárbaro elige un efecto: Golpe violento, que empuja al objetivo 4,5 metros y le permite avanzar la mitad de su velocidad sin provocar ataques de oportunidad, o Golpe rompehuesos, que reduce en 4,5 metros la velocidad del objetivo hasta el inicio de su siguiente turno.',
  'barbarian-subclass-feature-2': sub('bárbaro', 10),
  'relentless-rage':
    'Si llega a 0 puntos de golpe mientras está en ira y no muere en el acto, el bárbaro puede hacer una salvación de Constitución con CD 10: si la supera, sus puntos de golpe pasan a ser el doble de su nivel de bárbaro. Cada uso posterior aumenta la CD en 5, que vuelve a 10 tras un descanso corto o largo.',
  'improved-brutal-strike':
    'El bárbaro perfecciona nuevas formas de golpear y añade dos opciones al Golpe brutal: Golpe aturdidor, que impone desventaja a la siguiente salvación del objetivo y le impide los ataques de oportunidad hasta el inicio del siguiente turno del bárbaro, y Golpe de fragmentación, que concede un bonificador de +5 a la siguiente tirada de ataque de otra criatura contra ese objetivo.',
  'barbarian-subclass-feature-3': sub('bárbaro', 14),
  'persistent-rage':
    'Cuando hace una tirada de iniciativa, el bárbaro puede recuperar todos los usos gastados de ira, y no puede volver a hacerlo antes de un descanso largo. Además, la ira dura 10 minutos sin necesidad de prolongarla cada asalto y solo termina antes de tiempo si el bárbaro queda inconsciente o lleva armadura pesada.',
  'improved-brutal-strike-2':
    'El daño extra del Golpe brutal aumenta a 2d10 y el bárbaro puede causar dos efectos distintos de Golpe brutal cada vez que usa ese privilegio.',
  'indomitable-might':
    'Si el total de una prueba de Fuerza o de una salvación de Fuerza es inferior a su puntuación de Fuerza, el bárbaro puede usar esa puntuación en lugar del total.',
  'primal-champion':
    'El bárbaro se convierte en una encarnación del poder primigenio: sus puntuaciones de Fuerza y Constitución aumentan en 4, hasta un máximo de 25.',

  // ─── Senda del berserker ─────────────────────────────────────────
  frenzy:
    'Si usa Ataque temerario mientras está en ira, el bárbaro inflige daño extra al primer objetivo que golpea en su turno con un ataque basado en Fuerza: tira un número de d6 igual a su bonificador al daño de la ira y suma los resultados. El daño es del mismo tipo que el arma o el golpe desarmado usado.',
  'mindless-rage':
    'Mientras está en ira, el bárbaro no puede quedar hechizado ni asustado; si ya está hechizado o asustado cuando entra en ira, esa condición termina.',
  retaliation:
    'Cuando sufre daño de una criatura que está a 1,5 metros o menos de él, el bárbaro puede usar la reacción para realizar un ataque cuerpo a cuerpo contra esa criatura, con un arma o con un golpe desarmado.',
  'intimidating-presence':
    'Como acción adicional, cada criatura que el bárbaro elija dentro de una emanación de 9 metros de radio debe superar una salvación de Sabiduría, con CD igual a 8 más el modificador de Fuerza y el bonificador de competencia, o quedar asustada durante 1 minuto, repitiendo la tirada al final de cada uno de sus turnos. Necesita un descanso largo para volver a usarlo, o gastar un uso de la ira.',

  // ═══ Bardo ════════════════════════════════════════════════════════
  'bardic-inspiration':
    'Como acción adicional, el bardo inspira a otra criatura a 18 metros o menos que pueda verlo u oírlo, concediéndole un dado de Inspiración bárdica (d6). Durante la siguiente hora, cuando falla una prueba con d20, esa criatura puede tirar el dado y sumar el resultado. Los usos son iguales al modificador de Carisma del bardo y se recuperan con un descanso largo; el dado pasa a d8 en el nivel 5, d10 en el 10 y d12 en el 15.',
  'bard-subclass-d':
    'El bardo elige una subclase de bardo, como el Colegio del conocimiento, y obtiene sus privilegios en los niveles 3, 6 y 14.',
  'font-of-inspiration-d':
    'El bardo recupera todos los usos gastados de Inspiración bárdica al completar un descanso corto o largo. Además, puede gastar un espacio de conjuro, sin necesidad de ninguna acción, para recuperar un único uso.',
  'bard-subclass-feature': sub('bardo', 6),
  'countercharm-d':
    'Si el bardo o una criatura a 9 metros o menos de él falla una salvación contra un efecto que aplica la condición hechizado o asustado, el bardo puede usar la reacción para hacerle repetir esa salvación con ventaja.',
  'expertise-d':
    'El bardo obtiene Maestría en otras dos habilidades en las que tiene competencia: su bonificador de competencia se duplica en las pruebas de característica que las usan.',
  'magical-secrets-d':
    'Cada vez que aumenta el número de conjuros preparados indicado en la tabla del bardo, este puede elegir el nuevo conjuro de las listas de bardo, clérigo, druida y mago; para él cuenta en todo caso como conjuro de bardo. También puede sustituir un conjuro preparado por otro de esas listas.',
  'bard-subclass-feature-2': sub('bardo', 14),
  'superior-inspiration-d':
    'Cuando tira iniciativa, si tiene menos de dos usos de Inspiración bárdica el bardo recupera hasta tener dos.',
  'words-of-creation-d':
    'El bardo domina las palabras de la vida y de la muerte: los conjuros palabra de poder: curar y palabra de poder: matar se consideran siempre preparados y, cuando lanza uno, puede elegir como objetivo a una segunda criatura a 3 metros o menos del primer objetivo.',

  // ─── Colegio del conocimiento ───────────────────────────────────
  'bonus-proficiencies':
    'El bardo adquiere competencia en tres habilidades a su elección.',
  'cutting-words':
    'Cuando una criatura a 18 metros o menos que el bardo puede ver realiza una tirada de daño, o supera una prueba de característica o una tirada de ataque, el bardo puede usar la reacción y gastar un uso de Inspiración bárdica: tira el dado y resta el resultado de la tirada de la criatura, reduciendo el daño o convirtiendo el éxito en un fallo.',
  'magical-discoveries':
    'El bardo aprende dos conjuros a elegir de las listas de clérigo, druida o mago. Deben ser trucos o conjuros de un nivel del que disponga de espacios; se consideran siempre preparados y puede sustituir uno cada vez que obtiene un nivel de bardo.',
  'peerless-skill':
    'Cuando falla una prueba de característica o una tirada de ataque, el bardo puede gastar un uso de Inspiración bárdica para tirar el dado y sumar el resultado al d20. Si la tirada falla de todos modos, el uso no se consume.',

  // ═══ Clérigo ══════════════════════════════════════════════════════
  'divine-order':
    'El clérigo se dedica a un rol sagrado a su elección: Protector, que le concede competencia en armas de guerra y armaduras pesadas, o Taumaturgo, que le enseña un truco extra y suma su modificador de Sabiduría, mínimo +1, a las pruebas de Inteligencia (Arcanos o Religión).',
  'cleric-subclass':
    'El clérigo elige una subclase de clérigo, como el Dominio de la vida, y obtiene sus privilegios en los niveles 3, 6 y 17.',
  'sear-undead':
    'Cada vez que usa Ahuyentar no muertos, el clérigo tira un número de d8 igual a su modificador de Sabiduría, mínimo 1d8: cada no muerto que falla la salvación sufre daño radiante igual a la suma de los dados, sin que el efecto de Ahuyentar no muertos se interrumpa.',
  'cleric-subclass-feature': sub('clérigo', 6),
  'blessed-strikes':
    'El poder divino impregna al clérigo en combate, que elige entre dos opciones: Golpe divino, que una vez por turno añade 1d8 daño necrótico o radiante a un golpe acertado con un arma, o Conjuros potentes, que suma el modificador de Sabiduría al daño de cualquiera de sus trucos de clérigo.',
  'divine-intervention':
    'Como acción de Magia, el clérigo invoca a su deidad: elige un conjuro de clérigo de nivel 5 o inferior que no requiera una reacción para lanzarse y lo lanza sin gastar espacio de conjuro ni componentes materiales. Debe completar un descanso largo antes de poder repetirlo.',
  'improved-blessed-strikes':
    'La opción elegida para los Golpes benditos se vuelve más poderosa: el daño extra del Golpe divino aumenta a 2d8, o los Conjuros potentes conceden a sí mismo o a una criatura a 18 metros o menos puntos de golpe temporales iguales al doble del modificador de Sabiduría.',
  'cleric-subclass-feature-2': sub('clérigo', 17),
  'greater-divine-intervention':
    'Cuando usa Intervención divina, el clérigo puede elegir el conjuro deseo. Si lo hace, no puede volver a usar Intervención divina hasta haber completado 2d4 descansos largos.',

  // ─── Dominio de la vida ─────────────────────────────────────────
  'disciple-of-life':
    'Cuando un conjuro lanzado por el clérigo con un espacio de conjuro restaura puntos de golpe a una criatura, esta recupera además una cantidad igual a 2 más el nivel del espacio usado.',
  'life-domain-spells':
    'El vínculo con el dominio mantiene siempre preparados algunos conjuros: ayuda, bendición, curar heridas y restablecimiento menor por debajo del nivel 3; palabra de curación en masa y resurrección en el 5; aura de vida e interdicción de la muerte en el 7; restablecimiento mayor y curar heridas en masa en el 9.',
  'preserve-life':
    'Como acción de Magia, el clérigo gasta un uso de Canalizar divinidad para repartir entre las criaturas sangrantes a 9 metros o menos, incluido él mismo, un número de puntos de golpe igual a cinco veces su nivel de clérigo. Ninguna criatura puede quedar por encima de la mitad de sus puntos de golpe máximos.',
  'blessed-healer':
    'Inmediatamente después de lanzar con un espacio de conjuro un conjuro que restaura puntos de golpe a una o más criaturas distintas de sí mismo, el clérigo recupera puntos de golpe iguales a 2 más el nivel del espacio usado.',
  'supreme-healing':
    'Cuando debería tirar uno o más dados para restaurar puntos de golpe con un conjuro o con Canalizar divinidad, el clérigo usa en su lugar el resultado máximo de cada dado.',

  // ═══ Druida ═══════════════════════════════════════════════════════
  druidic:
    'El druida conoce el Druídico, la lengua secreta de su orden, y tiene siempre preparado el conjuro hablar con los animales. Con el Druídico puede dejar mensajes ocultos: quien no conozca la lengua puede notarlo con una prueba de Inteligencia (Investigación) con CD 15, pero no puede descifrarlos sin magia.',
  'wild-shape':
    'Como acción adicional, el druida adopta la forma de una bestia entre aquellas cuya forma ha aprendido, y permanece en ella durante un número de horas igual a la mitad de su nivel de druida. Obtiene puntos de golpe temporales iguales a su nivel y las estadísticas de la bestia, pero conserva su personalidad, recuerdos, capacidad de hablar, puntos de golpe, Dados de Golpe, puntuaciones mentales, privilegios de clase, idiomas y talentos. En forma bestial no puede lanzar conjuros, pero la transformación no interrumpe su concentración.',
  'druid-subclass':
    'El druida elige una subclase de druida, como el Círculo de la Tierra, y obtiene sus privilegios en los niveles 3, 6, 10 y 14.',
  'wild-resurgence':
    'Una vez por turno, si ha consumido todos los usos de Forma salvaje, el druida puede recuperar uno gastando un espacio de conjuro, sin necesidad de ninguna acción. Alternativamente, puede gastar un uso de Forma salvaje para obtener un espacio de conjuro de nivel 1, una vez por descanso largo.',
  'druid-subclass-feature': sub('druida', 6),
  'elemental-fury':
    'La fuerza de los elementos recorre al druida, que elige entre dos opciones: Conjuros potentes, que suma el modificador de Sabiduría al daño de sus trucos de druida, o Golpe primigenio, que una vez por turno añade 1d8 daño de frío, fuego, rayo o trueno a un golpe acertado con un arma o con un ataque de la forma bestial.',
  'druid-subclass-feature-2': sub('druida', 10),
  'druid-subclass-feature-3': sub('druida', 14),
  'improved-elemental-fury':
    'La opción elegida para la Furia elemental se vuelve más poderosa: el alcance de los trucos de druida con un radio de al menos 3 metros aumenta en 90 metros, o el daño extra del Golpe primigenio sube a 2d8.',
  'beast-spells':
    'Mientras usa Forma salvaje, el druida puede lanzar conjuros incluso en forma bestial, salvo aquellos que requieren componentes materiales con coste especificado o que los consumen.',
  archdruid:
    'La vitalidad de la naturaleza florece en el druida: cuando tira iniciativa sin usos disponibles de Forma salvaje recupera uno; puede convertir los usos no gastados en un único espacio de conjuro, contando 2 niveles por uso, una vez por descanso largo; y su cuerpo envejece 1 año por cada 10 años transcurridos.',

  // ─── Círculo de la Tierra ────────────────────────────────────────
  'circle-of-the-land-spells':
    'Al final de cada descanso largo el druida elige un tipo de terreno entre árido, polar, templado y tropical, y considera preparados los conjuros indicados para ese terreno hasta su nivel: tres conjuros en el nivel 3 y uno más en el 5, el 7 y el 9.',
  'lands-aid':
    'Como acción de Magia, el druida gasta un uso de Forma salvaje y elige un punto a 18 metros o menos: en una esfera de 3 metros de radio, cada criatura que elija sufre 2d6 daño necrótico, reducido a la mitad con una salvación de Constitución superada, mientras que una criatura de su elección en el área recupera 2d6 puntos de golpe. Los dados suben a 3d6 en el nivel 10 y a 4d6 en el 14.',
  'natural-recovery':
    'El druida puede lanzar sin gastar espacios uno de los conjuros preparados con Conjuros del Círculo, una vez por descanso largo. Además, al final de un descanso corto, recupera espacios de conjuro por un total de niveles igual a la mitad de su nivel de druida, redondeando hacia arriba, y ninguno de nivel superior al 6.',
  'natures-ward':
    'El druida es inmune a la condición envenenado y obtiene resistencia al tipo de daño asociado al terreno elegido: fuego para el árido, frío para el polar, rayo para el templado, veneno para el tropical.',
  'natures-sanctuary':
    'Como acción de Magia, el druida gasta un uso de Forma salvaje para hacer aparecer árboles y zarcillos espectrales en un cubo de 4,5 metros de arista a 36 metros o menos de él, durante 1 minuto. Él y sus aliados obtienen media cobertura en el área, y los aliados también la resistencia concedida por Protección de la naturaleza; como acción adicional puede mover el cubo hasta 18 metros.',

  // ═══ Guerrero ═════════════════════════════════════════════════════
  'second-wind':
    'Como acción adicional, el guerrero recurre a su reserva de resistencia física y mental y recupera puntos de golpe iguales a 1d10 más su nivel de guerrero. Dispone de dos usos: recupera uno con un descanso corto y todos con un descanso largo, y obtiene más en los niveles indicados en la tabla de la clase.',
  'action-surge-one-use':
    'En su turno, el guerrero puede empujarse más allá de sus límites y realizar una acción adicional, salvo la acción de Magia. Debe completar un descanso corto o largo antes de poder repetirlo.',
  'tactical-mind':
    'Cuando falla una prueba de característica, el guerrero puede gastar un uso de Recuperar el aliento para tirar 1d10 y sumar el resultado a la prueba, convirtiéndola potencialmente en un éxito. Si la prueba falla de todos modos, el uso no se gasta.',
  'fighter-subclass':
    'El guerrero elige una subclase de guerrero, como el Campeón, y obtiene sus privilegios en los niveles 3, 7, 10, 15 y 18.',
  'tactical-shift':
    'Cada vez que activa Recuperar el aliento con una acción adicional, el guerrero puede moverse hasta la mitad de su velocidad sin provocar ataques de oportunidad.',
  'fighter-subclass-feature': sub('guerrero', 7),
  'indomitable-one-use':
    'Si falla una salvación, el guerrero puede repetirla con un bonificador igual a su nivel de guerrero, estando obligado a usar el nuevo resultado. Debe completar un descanso largo antes de poder repetirlo.',
  'tactical-master':
    'Cuando ataca con un arma cuya propiedad de maestría puede utilizar, el guerrero puede sustituirla para ese ataque por las propiedades empujar, debilitar o ralentizar.',
  'fighter-subclass-feature-2': sub('guerrero', 10),
  'two-extra-attacks':
    'Cuando realiza la acción de Atacar en su turno, el guerrero puede atacar tres veces en lugar de una.',
  'indomitable-two-uses':
    'El guerrero puede usar el privilegio Indomable dos veces antes de completar un descanso largo.',
  'studied-attacks':
    'El guerrero aprende de cada ataque que realiza: si hace una tirada de ataque contra una criatura y falla, tiene ventaja en la siguiente tirada de ataque contra esa criatura, antes del final de su siguiente turno.',
  'fighter-subclass-feature-3': sub('guerrero', 15),
  'action-surge-two-uses':
    'El guerrero puede usar Oleada de acción dos veces antes de un descanso corto o largo, pero solo una vez en el mismo turno.',
  'indomitable-three-uses':
    'El guerrero puede usar el privilegio Indomable tres veces antes de completar un descanso largo.',
  'fighter-subclass-feature-4': sub('guerrero', 18),
  'three-extra-attacks':
    'Cuando realiza la acción de Atacar en su turno, el guerrero puede atacar cuatro veces en lugar de una.',

  // ─── Campeón ─────────────────────────────────────────────────────
  'improved-critical':
    'Las tiradas de ataque del guerrero con armas y con golpes desarmados consiguen un golpe crítico con un resultado de 19 o 20 en el d20.',
  'remarkable-athlete':
    'Gracias a sus dotes atléticas, el guerrero tiene ventaja en las tiradas de iniciativa y en las pruebas de Fuerza (Atletismo). Además, inmediatamente después de conseguir un golpe crítico, puede moverse hasta la mitad de su velocidad sin provocar ataques de oportunidad.',
  'additional-fighting-style':
    'El guerrero obtiene otro talento Estilo de combate a su elección.',
  'heroic-warrior':
    'La emoción de la batalla impulsa al guerrero: durante el combate puede concederse Inspiración heroica cada vez que empieza el turno sin tenerla.',
  'superior-critical':
    'Las tiradas de ataque del guerrero con armas y con golpes desarmados consiguen un golpe crítico con un resultado de 18 a 20 en el d20.',
  survivor:
    'El guerrero alcanza el apogeo de su resiliencia: tiene ventaja en las salvaciones contra la muerte y trata como un 20 cualquier resultado de 18 a 20. Además, si está sangrante y tiene al menos 1 punto de golpe, al inicio de cada uno de sus turnos recupera puntos de golpe iguales a 5 más su modificador de Constitución.',

  // ═══ Monje ════════════════════════════════════════════════════════
  'martial-arts':
    'Mientras esté desarmado o porte solo armas de monje, no lleve armadura y no use escudos, el monje puede realizar un golpe desarmado como acción adicional, tirar el dado de Artes marciales en lugar del daño normal del golpe o del arma de monje, y usar Destreza en lugar de Fuerza para las tiradas de ataque y de daño.',
  'monk-s-focus':
    'El adiestramiento del monje encauza una energía extraordinaria medida en puntos de concentración, cuyo número depende de su nivel. Al gastarlos activa Ráfaga de golpes, que asesta dos golpes desarmados como acción adicional, Defensa paciente, que combina Retirarse y Esquivar como acción adicional, y Paso del viento, que combina Retirarse y Correr como acción adicional duplicando la distancia de salto. Los puntos gastados se recuperan con un descanso corto o largo, y la CD de las salvaciones correspondientes es igual a 8 más el modificador de Sabiduría y el bonificador de competencia.',
  'unarmored-movement':
    'La velocidad del monje aumenta en 3 metros, siempre que no lleve armadura ni porte un escudo. El bonificador crece en los niveles indicados en la tabla del monje.',
  'deflect-attacks':
    'Cuando es golpeado por un ataque que incluye daño contundente, perforante o cortante, el monje puede usar la reacción para reducir el daño en 1d10 más su modificador de Destreza y su nivel de monje. Si lo reduce a 0, puede gastar 1 punto de concentración para redirigir parte de la fuerza del ataque contra una criatura a 1,5 metros o menos, o a 18 metros o menos si el ataque era a distancia.',
  'monk-subclass':
    'El monje elige una subclase de monje, como el Guerrero de la Mano Abierta, y obtiene sus privilegios en los niveles 3, 6, 11 y 17.',
  'slow-fall':
    'Cuando cae, el monje puede usar la reacción para reducir el daño por caída en una cantidad igual a cinco veces su nivel de monje.',
  'stunning-strike':
    'Una vez por turno, cuando golpea a una criatura con un arma de monje o con un golpe desarmado, el monje puede gastar 1 punto de concentración: el objetivo debe superar una salvación de Constitución o quedar aturdido hasta el inicio del siguiente turno del monje. Si la supera, su velocidad se reduce a la mitad y la siguiente tirada de ataque contra él tiene ventaja.',
  'empowered-strikes':
    'Cada vez que inflige daño con un golpe desarmado, el monje puede elegir infligir daño de fuerza en lugar del tipo de daño normal.',
  'monk-subclass-feature': sub('monje', 6),
  'acrobatic-movement':
    'Si no lleva armadura ni porta un escudo, en su turno el monje puede moverse por superficies verticales y sobre superficies líquidas sin caer durante el movimiento.',
  'heightened-focus':
    'Los tres privilegios alimentados por puntos de concentración mejoran: Ráfaga de golpes inflige tres golpes desarmados en lugar de dos; Defensa paciente concede puntos de golpe temporales iguales a dos tiradas del dado de Artes marciales; Paso del viento permite llevar consigo a una criatura consintiente a 1,5 metros o menos de tamaño Grande o inferior.',
  'self-restoration':
    'Al final de cada uno de sus turnos, el monje puede eliminar de sí mismo las condiciones hechizado, asustado o envenenado. Además, renunciar a comida y bebida no le hace acumular niveles de debilitamiento.',
  'monk-subclass-feature-2': sub('monje', 11),
  'deflect-energy':
    'El monje puede usar el privilegio Desviar ataques contra ataques que inflijan cualquier tipo de daño, no solo contra los contundentes, perforantes o cortantes.',
  'disciplined-survivor':
    'La disciplina física y mental del monje le confiere competencia en todas las salvaciones. Además, cuando falla una salvación, puede gastar 1 punto de concentración para repetirla, usando el nuevo resultado.',
  'perfect-focus':
    'Cuando tira iniciativa y tiene 3 puntos de concentración o menos, el monje recupera hasta tener 4.',
  'monk-subclass-feature-3': sub('monje', 17),
  'superior-defense':
    'Al inicio de su turno, el monje puede gastar 3 puntos de concentración para obtener resistencia a todo el daño excepto el de fuerza, durante 1 minuto o hasta que esté incapacitado.',
  'body-and-mind':
    'La mente y el cuerpo del monje alcanzan nuevas cotas: sus puntuaciones de Destreza y Sabiduría aumentan en 4, hasta un máximo de 25.',

  // ─── Guerrero de la Mano Abierta ─────────────────────────────────
  'open-hand-technique':
    'Cada vez que golpea a una criatura con un ataque de Ráfaga de golpes, el monje puede imponer un efecto a su elección: Desorientación, que impide al objetivo los ataques de oportunidad hasta el inicio de su siguiente turno; Empujón, que lo aleja hasta 4,5 metros si falla una salvación de Fuerza; Derribo, que lo hace caer derribado si falla una salvación de Destreza.',
  'wholeness-of-body':
    'Como acción adicional, el monje tira el dado de Artes marciales y recupera puntos de golpe iguales al resultado más su modificador de Sabiduría, mínimo 1. Los usos son iguales al modificador de Sabiduría, mínimo uno, y se recuperan con un descanso largo.',
  'fleet-step':
    'Cuando realiza una acción adicional distinta de Paso del viento, el monje puede usar también Paso del viento inmediatamente después de esa acción adicional.',
  'quivering-palm':
    'Cuando golpea a una criatura con un golpe desarmado, el monje puede gastar 4 puntos de concentración para desencadenar vibraciones imperceptibles que duran un número de días igual a su nivel de monje. Cuando les pone fin, el objetivo sufre 10d12 daño de fuerza, reducido a la mitad con una salvación de Constitución superada. Solo puede mantener a una criatura bajo este efecto a la vez.',

  // ═══ Paladín ══════════════════════════════════════════════════════
  'lay-on-hands':
    'El paladín posee una reserva de poder curativo igual a cinco veces su nivel, que se restablece con un descanso largo. Como acción adicional puede tocar a una criatura, incluido él mismo, y recurrir a la reserva para restaurarle puntos de golpe; también puede consumir 5 puntos de la reserva para curar el envenenamiento, sin que esos puntos restauren puntos de golpe.',
  'paladin-s-smite':
    'El conjuro castigo divino se considera siempre preparado y el paladín puede lanzarlo una vez sin consumir un espacio de conjuro, recuperando ese uso con un descanso largo.',
  'paladin-subclass':
    'El paladín elige una subclase de paladín, como el Juramento de devoción, y obtiene sus privilegios en los niveles 3, 7, 15 y 20.',
  'faithful-steed':
    'El paladín tiene siempre preparado el conjuro encontrar montura y puede lanzarlo una vez sin consumir un espacio de conjuro, recuperando ese uso con un descanso largo.',
  'aura-of-protection':
    'El paladín irradia un aura protectora invisible en una emanación de 3 metros: él y sus aliados en su interior obtienen un bonificador a las salvaciones igual a su modificador de Carisma, mínimo +1. El aura se apaga mientras el paladín está incapacitado, y una criatura solo puede beneficiarse de un Aura de protección a la vez.',
  'paladin-subclass-feature': sub('paladín', 7),
  'abjure-foes':
    'Como acción de Magia, el paladín consume un uso de Canalizar divinidad y elige como objetivo a un número de criaturas a 18 metros o menos igual a su modificador de Carisma, mínimo una. Cada objetivo debe superar una salvación de Sabiduría o quedar asustado durante 1 minuto, o hasta que sufra daño, pudiendo realizar en su turno solo una entre el movimiento, una acción y una acción adicional.',
  'aura-of-courage':
    'El paladín y sus aliados son inmunes al miedo mientras estén dentro del Aura de protección; un aliado asustado que entre en ella deja de sufrir el efecto del miedo mientras permanezca en su interior.',
  'radiant-strikes':
    'Los golpes del paladín se cargan de poder sobrenatural: cuando golpea a un objetivo con un arma cuerpo a cuerpo o con un golpe desarmado, le inflige 1d8 daño radiante adicional.',
  'restoring-touch':
    'Cuando usa Imposición de manos sobre una criatura, el paladín también puede liberarla de las condiciones cegado, hechizado, ensordecido, paralizado, asustado o aturdido, consumiendo 5 puntos de la reserva curativa por cada condición eliminada.',
  'paladin-subclass-feature-2': sub('paladín', 15),
  'aura-expansion':
    'El Aura de protección del paladín se convierte en una emanación de 9 metros de radio.',
  'paladin-subclass-feature-3': sub('paladín', 20),

  // ─── Juramento de devoción ───────────────────────────────────────
  'oath-of-devotion-spells':
    'La magia del juramento mantiene siempre preparados algunos conjuros: protección contra el bien y el mal y escudo de la fe en el nivel 3; ayuda y zona de verdad en el 5; faro de esperanza y disipar magia en el 9; libertad de movimiento y guardián de la fe en el 13; comunión y llama sagrada vengadora en el 17.',
  'sacred-weapon':
    'Cuando realiza la acción de Atacar, el paladín puede consumir un uso de Canalizar divinidad para infundir energía positiva en el arma cuerpo a cuerpo que porta: durante 10 minutos suma su modificador de Carisma a las tiradas de ataque con esa arma, mínimo +1, puede infligir daño radiante en lugar del normal, y el arma emite luz intensa en 6 metros y luz tenue en otros 6.',
  'aura-of-devotion':
    'El paladín y sus aliados no pueden quedar hechizados mientras estén dentro del Aura de protección; un aliado hechizado que entre en ella deja de sufrir ese efecto mientras permanezca en su interior.',
  'smite-of-protection':
    'Cada vez que lanza castigo divino, el paladín y sus aliados que estén dentro del Aura de protección obtienen media cobertura hasta el inicio de su siguiente turno.',
  'holy-nimbus':
    'Como acción adicional, el paladín impregna el Aura de protección de poder sagrado durante 10 minutos: los enemigos que empiecen el turno dentro del aura sufren daño radiante igual a su modificador de Carisma más el bonificador de competencia, el aura resplandece con luz solar y el paladín tiene ventaja en las salvaciones impuestas por infernales y no muertos. Necesita un descanso largo para volver a usarlo, o un espacio de conjuro de nivel 5.',

  // ═══ Explorador ═══════════════════════════════════════════════════
  'favored-enemy':
    'El explorador tiene siempre preparado el conjuro marca del cazador y puede lanzarlo dos veces sin consumir espacios de conjuro, recuperando los usos con un descanso largo. El número de usos aumenta en los niveles indicados en la tabla del explorador.',
  'deft-explorer':
    'Los numerosos viajes del explorador le conceden Maestría en una de las habilidades en las que tiene competencia y el conocimiento de dos idiomas a su elección.',
  'ranger-subclass':
    'El explorador elige una subclase de explorador, como el Cazador, y obtiene sus privilegios en los niveles 3, 7, 11 y 15.',
  roving:
    'La velocidad del explorador aumenta en 3 metros, siempre que no lleve armadura pesada, y obtiene velocidad de escalada y de natación iguales a su velocidad.',
  'ranger-subclass-feature': sub('explorador', 7),
  tireless:
    'Como acción de Magia, el explorador obtiene puntos de golpe temporales iguales a 1d8 más su modificador de Sabiduría, un número de veces igual a ese modificador y recuperando los usos con un descanso largo. Además, al completar un descanso corto, su nivel de debilitamiento disminuye en 1.',
  'ranger-subclass-feature-2': sub('explorador', 11),
  'relentless-hunter':
    'Sufrir daño ya no interrumpe la concentración del explorador en el conjuro marca del cazador.',
  'nature-s-veil':
    'Como acción adicional, el explorador invoca a los espíritus de la naturaleza y se otorga la condición invisible hasta el final de su siguiente turno. Los usos son iguales a su modificador de Sabiduría, mínimo uno, y se recuperan con un descanso largo.',
  'ranger-subclass-feature-3': sub('explorador', 15),
  'precise-hunter':
    'El explorador tiene ventaja en las tiradas de ataque contra la criatura sobre la que ha puesto su marca del cazador.',
  'feral-senses':
    'El vínculo con las fuerzas de la naturaleza confiere al explorador visión ciega en un radio de 9 metros.',
  'foe-slayer':
    'El daño del conjuro marca del cazador se tira con un d10 en lugar de con un d6.',

  // ─── Cazador ──────────────────────────────────────────────────────
  'hunters-lore':
    'Si una criatura lleva la marca del cazador del explorador, este sabe qué inmunidades, resistencias y vulnerabilidades posee ese objetivo.',
  'hunters-prey':
    'El explorador elige entre dos opciones: Devastador de hordas, que una vez por turno le concede otro ataque con la misma arma contra una criatura distinta a 1,5 metros o menos del primer objetivo, y Exterminador de colosos, que una vez por turno añade 1d8 daño contra una criatura a la que le falten puntos de golpe. Puede cambiar de opción al final de un descanso corto o largo.',
  'defensive-tactics':
    'El explorador elige entre dos opciones: Defensa frente a multiataque, por la que una criatura que lo golpea sufre desventaja en el resto de tiradas de ataque contra él ese turno, y Escapar de la horda, por la que los ataques de oportunidad contra él sufren desventaja. Puede cambiar de opción al final de un descanso corto o largo.',
  'superior-hunters-prey':
    'Una vez por turno, cuando inflige el daño de la marca del cazador a una criatura, el explorador puede infligirlo también a otra criatura en su campo de visión a 9 metros o menos del primer objetivo.',
  'superior-hunters-defense':
    'Cuando sufre daño, el explorador puede usar la reacción para obtener resistencia a ese tipo de daño hasta el final del turno en curso.',

  // ═══ Pícaro ═══════════════════════════════════════════════════════
  'sneak-attack':
    'Una vez por turno el pícaro inflige 1d6 daño extra a una criatura a la que golpea con un arma de precisión o a distancia, si tiene ventaja en la tirada de ataque, o si un aliado suyo no incapacitado está a 1,5 metros o menos del objetivo y la tirada no tiene desventaja. Los dados aumentan en los niveles indicados en la tabla del pícaro.',
  'thieves-cant':
    'El pícaro conoce el Argot de ladrones, el código de las comunidades donde ha perfeccionado sus habilidades ilícitas, y otro idioma a su elección.',
  'cunning-action':
    'La rapidez de espíritu del pícaro le permite realizar como acción adicional, en su turno, una entre las acciones de Correr, Retirarse y Esconderse.',
  'rogue-subclass':
    'El pícaro elige una subclase de pícaro, como el Truhan, y obtiene sus privilegios en los niveles 3, 9, 13 y 17.',
  'steady-aim':
    'Como acción adicional, el pícaro obtiene ventaja en su siguiente tirada de ataque del turno en curso. Solo puede hacerlo si no se ha movido ese turno y, tras usarlo, su velocidad se reduce a 0 hasta el final del turno.',
  'cunning-strike':
    'Cuando inflige el daño del Ataque furtivo, el pícaro puede renunciar a algunos dados de daño para añadir un efecto: Tropiezo, que cuesta 1d6 y hace caer derribado a un objetivo de tamaño Grande o inferior que falla una salvación de Destreza; Retirada, que cuesta 1d6 y le permite moverse la mitad de su velocidad sin provocar ataques de oportunidad; Veneno, que cuesta 1d6 e impone una salvación de Constitución para no quedar envenenado durante 1 minuto. La CD es igual a 8 más el modificador de Destreza y el bonificador de competencia.',
  'uncanny-dodge':
    'Cuando es golpeado por un atacante que está en su campo de visión, el pícaro puede usar la reacción para reducir a la mitad el daño sufrido, redondeando hacia abajo.',
  'expertise-2':
    'El pícaro obtiene Maestría en otras dos habilidades en las que tiene competencia: su bonificador de competencia se duplica en las pruebas de característica que las usan.',
  'reliable-talent':
    'Cuando hace una prueba de característica con una habilidad o herramienta en la que tiene competencia, el pícaro considera como 10 cualquier resultado del d20 igual o inferior a 9.',
  'rogue-subclass-feature': sub('pícaro', 9),
  'improved-cunning-strike':
    'El pícaro puede usar hasta dos efectos de Golpe astuto al infligir el daño del Ataque furtivo, pagando el coste en dados de cada uno de ellos.',
  'rogue-subclass-feature-2': sub('pícaro', 13),
  'devious-strikes':
    'El pícaro añade tres opciones al Golpe astuto: Derribo, que cuesta 6d6 y deja inconsciente durante 1 minuto al objetivo que falla una salvación de Constitución; Confusión, que cuesta 2d6 y le deja en el siguiente turno solo una entre el movimiento, una acción y una acción adicional; Oscurecimiento, que cuesta 3d6 y lo ciega hasta el final de su siguiente turno si falla una salvación de Destreza.',
  'slippery-mind':
    'La mente astuta del pícaro es difícil de controlar: obtiene competencia en las salvaciones de Sabiduría y Carisma.',
  'rogue-subclass-feature-3': sub('pícaro', 17),
  elusive:
    'El pícaro es tan escurridizo que ninguna tirada de ataque contra él puede tener ventaja, a menos que esté incapacitado.',
  'stroke-of-luck':
    'Si falla una prueba con d20, el pícaro puede convertir el resultado en un 20. Debe completar un descanso corto o largo antes de poder repetirlo.',

  // ─── Truhan ───────────────────────────────────────────────────────
  'fast-hands':
    'Como acción adicional, el pícaro puede hacer una prueba de Destreza (Juego de manos) para forzar una cerradura, desactivar una trampa con herramientas de ladrón o robar a alguien, o realizar la acción de Utilizar o de Magia para usar un objeto mágico que lo requiera.',
  'second-story-work':
    'El duro adiestramiento lleva al pícaro donde es difícil llegar: obtiene una velocidad de escalada igual a su velocidad y puede determinar la distancia de sus saltos con el modificador de Destreza en lugar del de Fuerza.',
  'supreme-sneak':
    'El pícaro obtiene la opción de Golpe astuto Ataque oculto, que cuesta 1d6: si es invisible por la acción Esconderse, el ataque no interrumpe esa condición, siempre que el pícaro termine el turno tras tres cuartos de cobertura o cobertura total.',
  'use-magic-device':
    'El pícaro saca el máximo partido de los objetos mágicos: al usar una propiedad con cargas tira 1d6 y con un 6 no consume cargas; puede usar cualquier pergamino mágico con Inteligencia como característica de lanzamiento de conjuros, superando una prueba de Inteligencia (Arcanos) con CD 10 más el nivel del conjuro para los de nivel superior al 1; y puede sintonizarse con un máximo de cuatro objetos mágicos.',
  'thiefs-reflexes':
    'En el primer asalto de cada combate el pícaro realiza dos turnos: el primero en su iniciativa normal y el segundo en su iniciativa menos 10.',

  // ═══ Hechicero ════════════════════════════════════════════════════
  'font-of-magic':
    'El hechicero recurre a la fuente de poder mágico que lleva dentro, representada por los puntos de hechicería indicados en la tabla de la clase y recuperados con un descanso largo. Puede consumir un espacio de conjuro para obtener puntos de hechicería iguales al nivel del espacio y, como acción adicional, convertir los puntos no gastados en espacios de conjuro hasta el nivel 5, que desaparecen en el siguiente descanso largo.',
  'sorcerer-subclass':
    'El hechicero elige una subclase de hechicero, como la Hechicería dracónica, y obtiene sus privilegios en los niveles 3, 6, 14 y 18.',
  sorcerous:
    'Al completar un descanso corto, el hechicero recupera puntos de hechicería gastados hasta un máximo igual a la mitad de su nivel de hechicero, redondeando hacia abajo. Debe completar un descanso largo antes de poder repetirlo.',
  'sorcerer-subclass-feature': sub('hechicero', 6),
  'sorcery-incarnate':
    'Si ha consumido todos los usos de Hechicería innata, el hechicero puede activarla como acción adicional gastando 2 puntos de hechicería. Además, mientras ese privilegio esté activo, puede usar hasta dos opciones de Metamagia en cada conjuro que lance.',
  metamagic:
    'Como su magia es innata, el hechicero puede alterar los conjuros según sus necesidades: obtiene dos opciones de Metamagia, que aplica a los conjuros lanzados gastando el coste en puntos de hechicería indicado por cada una. Normalmente solo puede usar una opción por conjuro y, cada vez que obtiene un nivel de hechicero, puede sustituir una de las opciones conocidas por otra.',
  'sorcerer-subclass-feature-2': sub('hechicero', 14),
  'metamagic-2':
    'El hechicero obtiene otras dos opciones de Metamagia a su elección entre las indicadas en la descripción de la clase.',
  'sorcerer-subclass-feature-3': sub('hechicero', 18),
  'arcane-apotheosis':
    'Mientras el privilegio Hechicería innata está activo, el hechicero puede usar una opción de Metamagia en cada turno sin gastar puntos de hechicería.',

  // ─── Hechicería dracónica ────────────────────────────────────────
  'draconic-resilience':
    'La magia dracónica da forma al cuerpo del hechicero: sus puntos de golpe máximos suben en 3 y aumentan en 1 en cada nivel de hechicero posterior. Además, partes de su cuerpo se cubren de escamas de dragón y, si no lleva armadura, su Clase de Armadura base es igual a 10 más los modificadores de Destreza y Carisma.',
  'draconic-spells':
    'La ascendencia dracónica mantiene siempre preparados algunos conjuros: alterar el ser propio, esfera cromática, orden y aliento del dragón en el nivel 3; miedo y volar en el 5; ojo arcano y encantar monstruos en el 7; conocimientos y convocar dragón en el 9.',
  'elemental-affinity':
    'El hechicero elige un tipo de daño asociado a los dragones entre ácido, frío, rayo, fuego y veneno: obtiene resistencia a ese daño y, cuando lanza un conjuro de ese elemento, puede sumar su modificador de Carisma a una tirada de daño.',
  'dragon-wings':
    'Como acción adicional, el hechicero hace aparecer en su espalda alas dracónicas que le confieren velocidad de vuelo de 18 metros durante 1 hora, o hasta que las hace desaparecer. Necesita un descanso largo para volver a usarlo, o gastar 3 puntos de hechicería.',
  'dragon-companion':
    'El hechicero puede lanzar convocar dragón sin usar componentes materiales y, una vez por descanso largo, también sin consumir un espacio de conjuro.',

  // ═══ Brujo ════════════════════════════════════════════════════════
  'eldritch-invocations':
    'El brujo ha descubierto las Invocaciones ocultistas, fragmentos de conocimiento prohibido que le confieren dotes mágicas persistentes, como el Pacto del tomo. Algunas invocaciones tienen prerrequisitos; cada vez que obtiene un nivel de brujo puede sustituir una, y en los niveles indicados en la tabla de la clase obtiene más.',
  'pact-magic':
    'A través de una ceremonia oculta, el brujo ha sellado un pacto con una entidad misteriosa que le ha concedido la capacidad de lanzar conjuros. Sus espacios de conjuro son todos del mismo nivel, del 1 al 5, y se recuperan con un descanso corto o largo; la característica de lanzamiento de conjuros es el Carisma.',
  'magical-cunning':
    'El brujo puede realizar un rito esotérico de 1 minuto de duración, al final del cual recupera espacios de conjuro gastados de Magia de pacto, hasta la mitad de su número máximo redondeando hacia arriba. Debe completar un descanso largo antes de poder repetirlo.',
  'warlock-subclass':
    'El brujo elige una subclase de brujo, como el Patrón diablo, y obtiene sus privilegios en los niveles 3, 6, 10 y 14.',
  'warlock-subclass-feature': sub('brujo', 6),
  'warlock-subclass-feature-2': sub('brujo', 10),
  'contact-patron':
    'El brujo tiene siempre preparado el conjuro contactar con otros planos y puede lanzarlo sin consumir un espacio de conjuro para hablar directamente con su patrón, superando automáticamente la salvación correspondiente. Debe completar un descanso largo antes de poder repetirlo.',
  'mystic-arcanum-level-6-spell':
    'El patrón revela al brujo un secreto mágico: elige un conjuro de brujo de nivel 6 y puede lanzarlo una vez sin consumir espacios de conjuro, recuperando ese uso con un descanso largo.',
  'mystic-arcanum-level-7-spell':
    'El brujo elige otro arcano, esta vez un conjuro de brujo de nivel 7, que puede lanzar una vez por descanso largo sin consumir espacios de conjuro.',
  'warlock-subclass-feature-3': sub('brujo', 14),
  'mystic-arcanum-level-8-spell':
    'El brujo elige otro arcano, esta vez un conjuro de brujo de nivel 8, que puede lanzar una vez por descanso largo sin consumir espacios de conjuro.',
  'mystic-arcanum-level-9-spell':
    'El brujo elige otro arcano, esta vez un conjuro de brujo de nivel 9, que puede lanzar una vez por descanso largo sin consumir espacios de conjuro.',
  'eldritch-master':
    'Cuando usa el privilegio Astucia mágica, el brujo recupera todos los espacios de conjuro gastados de Magia de pacto.',

  // ─── Patrón diablo ────────────────────────────────────────────────
  'dark-ones-blessing':
    'Cuando reduce a un enemigo a 0 puntos de golpe, o cuando lo hace otra persona con un enemigo a 3 metros o menos de él, el brujo obtiene puntos de golpe temporales iguales a su modificador de Carisma más su nivel de brujo, mínimo 1.',
  'fiend-spells':
    'La magia del patrón mantiene siempre preparados algunos conjuros: orden, manos ardientes, rayo abrasador y sugestión en el nivel 3; nube pestilente y bola de fuego en el 5; muro de fuego y escudo de fuego en el 7; contención y plaga de insectos en el 9.',
  'dark-ones-own-luck':
    'Cuando hace una prueba de característica o una salvación, el brujo puede sumar 1d10 al resultado, incluso después de ver la tirada pero antes de que se apliquen sus efectos. Los usos son iguales a su modificador de Carisma, mínimo uno, y se recuperan con un descanso largo.',
  'fiendish-resilience':
    'Cada vez que completa un descanso corto o largo, el brujo elige un tipo de daño distinto de fuerza y obtiene resistencia a ese daño hasta que elige otro con este privilegio.',
  'hurl-through-hell':
    'Una vez por turno, cuando golpea a una criatura con una tirada de ataque, el brujo puede intentar arrastrarla a los Planos Inferiores: si el objetivo falla una salvación de Carisma y no es un infernal, sufre 8d10 daño psíquico y queda incapacitado hasta el final del siguiente turno del brujo, cuando reaparece en el espacio que ocupaba o en el espacio libre más cercano. Necesita un descanso largo para volver a usarlo, o un espacio de conjuro de Magia de pacto.',

  // ═══ Mago ═════════════════════════════════════════════════════════
  'ritual-adept':
    'El mago puede lanzar como ritual cualquier conjuro con el descriptor ritual contenido en su libro de conjuros, incluso sin haberlo preparado, siempre que para lanzarlo lea el libro.',
  scholar:
    'A lo largo de sus estudios el mago también se ha especializado en otra disciplina: elige una entre Arcanos, Investigación, Medicina, Naturaleza, Religión e Historia en la que tiene competencia y obtiene Maestría en esa habilidad.',
  'wizard-subclass':
    'El mago elige una subclase de mago, como el Invocador, y obtiene sus privilegios en los niveles 3, 6, 10 y 14.',
  'memorize-spell':
    'Al completar un descanso corto, el mago puede estudiar su libro de conjuros y sustituir uno de los conjuros preparados de nivel 1 o superior por otro de igual o distinto nivel del libro.',
  'wizard-subclass-feature': sub('mago', 6),
  'wizard-subclass-feature-2': sub('mago', 10),
  'wizard-subclass-feature-3': sub('mago', 14),
  'spell-mastery':
    'El mago elige de su libro un conjuro de nivel 1 y uno de nivel 2 con tiempo de lanzamiento de una acción: se consideran siempre preparados y puede lanzarlos a su nivel más bajo sin consumir espacios de conjuro. Al final de un descanso largo puede sustituirlos por otros del mismo nivel de su libro.',
  'signature-spells':
    'El mago elige dos conjuros de nivel 3 de su libro: se consideran siempre preparados y puede lanzar cada uno una vez de nivel 3 sin consumir espacios de conjuro, recuperando esos usos con un descanso corto o largo.',

  // ─── Invocador ────────────────────────────────────────────────────
  'evocation-savant':
    'El mago añade gratis a su libro de conjuros dos conjuros de mago de la escuela de Evocación de nivel 2 o inferior y, cada vez que obtiene acceso a un nuevo nivel de espacio de conjuro, otro conjuro de esa escuela.',
  'potent-cantrip':
    'Cuando el mago lanza un truco contra una criatura y falla la tirada de ataque, o esta supera la salvación, el objetivo sufre de todos modos la mitad del daño, pero no los efectos adicionales del truco.',
  'sculpt-spells':
    'Cuando lanza un conjuro de la escuela de Evocación que afecta a otras criaturas en su campo de visión, el mago elige un número igual a 1 más el nivel del conjuro: esas criaturas superan automáticamente la salvación y no sufren daño alguno si normalmente sufrirían la mitad.',
  'empowered-evocation':
    'Cuando lanza un conjuro de la escuela de Evocación, el mago puede sumar su modificador de Inteligencia a una tirada de daño.',
  overchannel:
    'Cuando lanza con un espacio de nivel 1 a 5 un conjuro que inflige daño, el mago puede infligir el máximo. La primera vez no sufre ningún efecto adverso; si lo repite antes de completar un descanso largo sufre 2d12 daño necrótico por nivel del conjuro, que ignora resistencias e inmunidades y aumenta en 1d12 en cada uso adicional.',

  // ─── Descripciones de las subclases ───────────────────────────────
  // El subtítulo del manual y el párrafo de apertura, igual que en los
  // correspondientes ingleses de classes.ts.
  'path-of-the-berserker':
    'Canaliza la ira en furia violenta. La ira de los bárbaros que recorren la Senda del berserker se dirige principalmente hacia la violencia. Es una senda de furia indiscriminada en la que los bárbaros se exaltan en el caos de la batalla, dejando que la ira se apodere de ellos y los haga más fuertes.',
  'college-of-lore':
    'Escudriña las profundidades del conocimiento mágico. Los bardos del Colegio del Conocimiento acumulan conjuros y secretos de diversas fuentes, como tomos académicos, ritos místicos y relatos de la tradición popular. Los miembros del colegio se reúnen en bibliotecas y universidades para compartir su sabiduría con los demás. También se encuentran en fiestas populares y recepciones de estado, donde pueden denunciar casos de corrupción, desenmascarar mentiras y burlarse de los exponentes más pomposos de la autoridad.',
  'life-domain':
    'Alivia las heridas del mundo. El Dominio de la Vida se centra en la energía positiva que ayuda a sostener a todo ser vivo del multiverso. Los clérigos que recurren a este dominio son maestros de la curación y usan la fuerza vital para sanar muchas heridas. La propia existencia se basa en la energía positiva asociada a este dominio, lo que lo hace adecuado para casi cualquier tradición religiosa. Este dominio está asociado en particular a las deidades de la agricultura, a los dioses de la curación o de la resistencia y a los dioses del hogar y de la comunidad. La magia de este dominio también es buscada por las órdenes religiosas de sanadores.',
  'circle-of-the-land':
    'Celebra la conexión con el mundo natural. El Círculo de la Tierra está compuesto por místicos y sabios que preservan los ritos y conocimientos de tiempos antiguos. Estos druidas se reúnen dentro de círculos sagrados de árboles o monolitos, para revelarse en Druídico los secretos primigenios que han aprendido. Los miembros más sabios del círculo presiden como sumos sacerdotes de las comunidades.',
  'champion':
    'Alcanza la excelencia física en combate. El campeón se centra en desarrollar habilidades marciales en una búsqueda incesante de la victoria. Combina un entrenamiento riguroso con una condición física excelente para infligir golpes devastadores, resistir peligros y obtener gloria. Ya se trate de competiciones atléticas o de batallas sangrientas, los campeones luchan por la corona del vencedor.',
  'thief':
    'Ve en busca de tesoros como un auténtico aventurero. Gracias a sus habilidades como forzador de cerraduras, cazador de tesoros y explorador, el personaje ya representa al aventurero por excelencia. Además de presumir de agilidad y sigilo mejorados, obtiene habilidades útiles para adentrarse en ruinas inexploradas y sacar el máximo partido de los objetos mágicos que contienen.',
  'evoker':
    'Crea efectos elementales explosivos. Un invocador concentra sus estudios en las magias que generan potentes efectos elementales como un frío penetrante, una llama incandescente, un estruendo de trueno, un rayo crepitante o un ácido chisporroteante. Algunos invocadores prestan servicio en las fuerzas militares como unidades de artillería capaces de golpear a los ejércitos enemigos desde lejos. Otros usan sus poderes para proteger al prójimo, mientras que otros los aprovechan para su propio beneficio.',
  'warrior-of-the-open-hand':
    'Domina las técnicas de combate desarmado. Los Guerreros de la Mano Abierta son los maestros del combate desarmado. Aprenden técnicas especiales para empujar y desequilibrar a sus adversarios y manipulan su propia energía para protegerse del daño.',
  'oath-of-devotion':
    'Mantén la fe en los ideales de justicia y orden. El Juramento de devoción vincula a los paladines a los ideales de justicia y orden, acercándolos al arquetipo del "caballero sin tacha y sin miedo". Se consideran modelos ejemplares de conducta y algunos de ellos, para bien o para mal, aplican los mismos parámetros al resto del mundo. Muchos de los que prestan este juramento son devotos de los dioses de la legalidad y el bien, y usan los preceptos de sus divinidades como medida de su propia devoción. Otros, en cambio, toman a los ángeles como ejemplo de sus ideales e integran imágenes de alas angelicales en sus yelmos o blasones. Comparten los siguientes preceptos: • Que tu palabra sea vinculante como una promesa. • Protege a los débiles y no tengas miedo nunca de actuar. • Que tus honorables gestas sean ejemplo para los demás.',
  'hunter':
    'Protege la naturaleza y a las personas de la destrucción. Acechas a tu presa tanto en tierras salvajes como en cualquier otro lugar, usando tus habilidades de cazador para proteger la naturaleza y a las personas de las fuerzas que pretenden destruirlas.',
  'draconic-sorcery':
    'Déjate embriagar por la magia de los dragones. La magia innata del hechicero proviene del don de un dragón. Puede haberla heredado de un dragón anciano que, próximo a la muerte, confirió su propio poder mágico a él o a un antepasado suyo, o quizá la absorbió de un lugar impregnado de energía dracónica o de uno de los tesoros de estas criaturas. O uno de sus antepasados era un dragón.',
  'fiend-patron':
    'Sella un pacto con los Planos Inferiores. Gracias al pacto sellado, el brujo extrae sus poderes de los Planos Inferiores, los reinos de la perdición. Puede haber alcanzado un acuerdo con un señor demonio, un archidiablo u otro infernal particularmente poderoso. El patrón tiene objetivos malvados, como la corrupción o la destrucción de todo (incluido el propio brujo), y el camino del personaje estará determinado por hasta qué punto luche por sabotearlos.',
}
