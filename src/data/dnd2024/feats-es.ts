// Descripciones en español de los talentos de D&D 2024.
//
// Terminología del SRD 5.2.1 traducida al español: "salvación", "bonificador
// de competencia", "acción adicional", "descanso corto/largo", "ventaja",
// "golpe desarmado", "visión verdadera", "espacio de conjuro". Las distancias
// están en metros, igual que en el resto de la app.
//
// CUIDADO CON LA EDICIÓN. Aquí estamos en 2024: los talentos se dividen en
// categorías (Origen, General, Estilo de combate, Dádiva épica) y los estilos
// de combate son talentos independientes. En 2014 los estilos eran
// privilegios de clase y los talentos eran una regla opcional: los dos
// conjuntos no deben mezclarse.
//
// Los NOMBRES de los talentos no están aquí sino en `src/i18n/gameTerms.ts`
// (featureNamesEs), junto con los nombres de los privilegios: es un único
// mapa para toda la app, así el resumen y la ficha en PDF no pueden divergir.

export const dnd2024FeatDescriptionsEs: Record<string, string> = {
  // ═══ Talentos de Origen ═════════════════════════════════════════════
  'alert':
    'El personaje obtiene los siguientes beneficios. Competencia en iniciativa. Cuando tires iniciativa, puedes sumar el bonificador de competencia del personaje al resultado de la tirada. Intercambio de iniciativa. Inmediatamente después de tirar iniciativa, puedes intercambiar el resultado obtenido con el de un aliado consintiente durante ese mismo combate. Si tu personaje o su aliado está incapacitado, no se puede realizar el intercambio.',
  'magic-initiate':
    'El personaje obtiene los siguientes beneficios. Dos trucos. El personaje aprende dos trucos a elegir de la lista de conjuros de clérigo, druida o mago. La característica de lanzamiento de conjuros para los conjuros de este talento puede ser Inteligencia, Sabiduría o Carisma (elige la característica al obtener este talento). Conjuro de nivel 1. Elige un conjuro de nivel 1 de la misma lista de la que seleccionaste los trucos proporcionados por este talento. Ese conjuro se considera siempre preparado. El personaje puede lanzarlo una vez sin consumir un espacio de conjuro y recupera ese uso al completar un descanso largo. También puede lanzar el conjuro usando cualquiera de los espacios de conjuro de que disponga. Cambio de conjuro. Cuando el personaje obtiene un nuevo nivel, puedes sustituir uno de los conjuros elegidos para este talento por otro del mismo nivel de la lista elegida. Repetible. Este talento se puede obtener más de una vez, pero debes elegir una lista de conjuros distinta en cada selección.',
  'savage-attacker':
    'El personaje se ha entrenado para asestar golpes especialmente letales. Una vez por turno, cuando golpea a un objetivo con un arma, puedes tirar dos veces el daño del arma y elegir el resultado que prefieras.',
  'skilled':
    'El personaje obtiene competencia en una combinación de tres habilidades o herramientas a su elección. Repetible. Este talento se puede obtener más de una vez.',

  // ═══ Talentos Generales ═════════════════════════════════════════════
  'ability-score-improvement':
    'Aumenta una puntuación de característica a tu elección en 2, o aumenta dos puntuaciones de característica en 1. Este talento no puede incrementar una puntuación de característica por encima de 20. Repetible. Este talento se puede obtener más de una vez.',
  'grappler':
    'El personaje obtiene los siguientes beneficios. Incremento de puntuación de característica. Su puntuación de Fuerza o Destreza aumenta en 1, hasta un máximo de 20. Golpea y agarra. Cuando el personaje golpea a una criatura con un golpe desarmado como parte de una acción de Atacar en su turno, puede usar tanto la opción de Daño como la de Agarre. Este beneficio solo se puede usar una vez por turno. Ataque con ventaja. Tiene ventaja en las tiradas de ataque contra las criaturas que ha agarrado. Luchador rápido. El personaje no necesita gastar movimiento extra al mover a una criatura que ha agarrado que sea de su misma categoría de tamaño o inferior.',

  // ═══ Talentos de Estilo de combate ══════════════════════════════════
  'archery':
    'El personaje obtiene un bonificador de +2 a las tiradas de ataque que realiza con armas a distancia.',
  'defense':
    'Mientras el personaje lleve armadura ligera, media o pesada, obtiene un +1 a la Clase de Armadura.',
  'great-weapon-fighting':
    'Cuando tires el daño de un ataque realizado con un arma cuerpo a cuerpo que el personaje empuñe a dos manos, si el resultado obtenido es 1 o 2, puedes considerarlo en su lugar un 3. El arma debe tener la propiedad a dos manos o versátil para obtener este beneficio.',
  'two-weapon-fighting':
    'Cuando el personaje realiza un ataque extra como resultado del uso de un arma ligera, puedes sumar su modificador de característica al daño de ese ataque, siempre que no se haya sumado ya de otra forma.',

  // ═══ Talentos de Dádiva épica ═══════════════════════════════════════
  'boon-of-combat-prowess':
    'El personaje obtiene los siguientes beneficios. Incremento de puntuación de característica. La puntuación de una de sus características a elección aumenta en 1, hasta un máximo de 30. Puntería inigualable. Cuando la tirada de ataque del personaje falla, es posible golpear igualmente al objetivo. Una vez aprovechado este beneficio, no se puede volver a usar hasta el inicio del siguiente turno del personaje.',
  'boon-of-dimensional-travel':
    'El personaje obtiene los siguientes beneficios. Incremento de puntuación de característica. La puntuación de una de sus características a elección aumenta en 1, hasta un máximo de 30. Pasos fulgurantes. Inmediatamente después de que el personaje realice una acción de Atacar o de Magia, puede teleportarse hasta 9 metros a un espacio libre que pueda ver.',
  'boon-of-fate':
    'El personaje obtiene los siguientes beneficios. Incremento de puntuación de característica. La puntuación de una de sus características a elección aumenta en 1, hasta un máximo de 30. Destino mejorado. Cuando el personaje u otra criatura a 18 metros o menos de él supera o falla una prueba con d20, puede tirar 2d4 y aplicar el resultado obtenido como bonificador o penalización a esa prueba con d20. Una vez usado este beneficio, no puede volver a usarlo hasta que tire iniciativa o complete un descanso corto o largo.',
  'boon-of-irresistible-offense':
    'El personaje obtiene los siguientes beneficios. Incremento de puntuación de característica. Su puntuación de Fuerza o Destreza aumenta en 1, hasta un máximo de 30. Ignora defensas. El daño contundente, perforante y cortante infligido por el personaje siempre ignora la resistencia. Golpe abrumador. Cuando tira para golpear con el d20 y obtiene un 20, el personaje puede infligir al objetivo una cantidad de daño extra igual a la puntuación de característica incrementada por este talento. El daño adicional es del mismo tipo que el del ataque.',
  'boon-of-spell-recall':
    'El personaje obtiene los siguientes beneficios. Incremento de puntuación de característica. Su puntuación de Inteligencia, Sabiduría o Carisma aumenta en 1, hasta un máximo de 30. Lanzamiento libre. Cuando lanza un conjuro con un espacio de nivel 1 a 4, tira 1d4. Si el resultado coincide con el nivel del espacio, este no se consume.',
  'boon-of-the-night-spirit':
    'El personaje obtiene los siguientes beneficios. Incremento de puntuación de característica. La puntuación de una de sus características a elección aumenta en 1, hasta un máximo de 30. Fusión con las sombras. Mientras esté en un área de oscuridad o luz tenue, puede volverse invisible como acción adicional. Esa condición termina inmediatamente después de que el personaje realice una acción, una acción adicional o una reacción. Forma de sombra. Mientras esté en un área de oscuridad o luz tenue, tiene resistencia a todos los tipos de daño excepto psíquico y radiante.',
  'boon-of-truesight':
    'El personaje obtiene los siguientes beneficios. Incremento de puntuación de característica. La puntuación de una de sus características a elección aumenta en 1, hasta un máximo de 30. Visión verdadera. El personaje obtiene visión verdadera con un alcance de 18 metros.',
}

/**
 * Descripción del talento en el idioma solicitado.
 *
 * Fuera del italiano y del español se vuelve al texto inglés de `feats.ts`:
 * es la misma regla que `getFeatureDescription` aplica a los privilegios de
 * clase, y sirve para que la ficha no combine dos idiomas en la misma pantalla.
 */
export function getDnd2024FeatDescriptionEs(featId: string, locale: string, fallback: string): string {
  if (locale !== 'es') return fallback
  return dnd2024FeatDescriptionsEs[featId] ?? fallback
}
