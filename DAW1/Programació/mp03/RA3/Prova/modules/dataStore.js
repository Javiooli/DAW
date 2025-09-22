const reactionTimes = [];

export function addReactionTime(time) {
  // TODO: afegir el temps a l'array, i ordenar l'array de millor temps a pitjor.
  if (time != null) { // Per si de cas, comprovem que ha entrat un temps per parametre
    reactionTimes.push(time);
    reactionTimes.sort(function(a, b){return a - b}); // Ordenem numericament. Sense el parametre de sort() ens ordena com si fos text, aixi que 200 i 2000 anirien junts abans de 300.
  }
}

export function getAllTimes() {
  return reactionTimes;
}
