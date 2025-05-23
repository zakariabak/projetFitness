// Calcul du métabolisme de base et calories cibles selon profil
export function calculCalories(
  poids: number,
  taille: number,
  age: number,
  sexe: string,
  niveauActivite: number,
  objectif: string
) {
  let metabolisme = 0;

  // formule Mifflin-St Jeor
  if (sexe === "Homme") {
    metabolisme = 10 * poids + 6.25 * taille - 5 * age + 5;
  } else {
    metabolisme = 10 * poids + 6.25 * taille - 5 * age - 161;
  }

  const tdee = metabolisme * niveauActivite; // Total Daily Energy Expenditure

  // ajustement selon objectif
  let caloriesCible = tdee;
  if (objectif === "Perdre du poids") {
    caloriesCible = tdee - 300; // déficit calorique
  } else if (objectif === "Gagner du muscle") {
    caloriesCible = tdee + 300; // surplus calorique
  } // "Garder la forme" = tdee sans changement

  return Math.round(caloriesCible);
}

// Calcul macros selon poids et calories totales
export function calculMacros(poids: number, calories: number) {
  const proteines = Math.round(poids * 2.2);  // g protéines
  const lipides = Math.round(poids * 1);      // g lipides
  const caloriesRestantes = calories - (proteines * 4 + lipides * 9);
  const glucides = Math.round(caloriesRestantes / 4); // g glucides

  return { proteines, lipides, glucides };
}

// Estimation de la date d'atteinte du poids objectif via régression linéaire
export function estimationDateObjectif(
  poidsHistorique: { poids: number; date: Date | string }[],
  poidsObjectif: number
): { dateEstimee: Date | null, details?: any } {
  if (!poidsHistorique || poidsHistorique.length < 2 || !poidsObjectif) {
    return { dateEstimee: null };
  }

  // trie par date croissante et sélection des 4 derniers points
  const sortedByDate = [...poidsHistorique].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const recent = sortedByDate.slice(-4);

  // prépare données pour régression
  const sorted = [...recent]
    .map(p => ({
      poids: p.poids,
      x: typeof p.date === "string" ? new Date(p.date).getTime() : p.date.getTime()
    }))
    .sort((a, b) => a.x - b.x);

  const x0 = sorted[0].x;
  const data = sorted.map(p => ({
    x: (p.x - x0) / (1000 * 3600 * 24), // en jours depuis x0
    y: p.poids
  }));

  const n = data.length;
  const sumX = data.reduce((acc, d) => acc + d.x, 0);
  const sumY = data.reduce((acc, d) => acc + d.y, 0);
  const sumXY = data.reduce((acc, d) => acc + d.x * d.y, 0);
  const sumXX = data.reduce((acc, d) => acc + d.x * d.x, 0);

  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) return { dateEstimee: null };

  // calcul coefficients de la droite y = a*x + b
  const a = (n * sumXY - sumX * sumY) / denominator;
  const b = (sumY * sumXX - sumX * sumXY) / denominator;

  if (a === 0) return { dateEstimee: null };

  // calcul du jour (x) où poids = poidsObjectif
  const xObjectif = (poidsObjectif - b) / a;

  if (xObjectif < 0) return { dateEstimee: null };

  // date estimée d'atteinte
  const dateEstimee = new Date(x0 + xObjectif * 24 * 3600 * 1000);

  return {
    dateEstimee,
    details: { a, b, xObjectif }
  };
}

// Calcul de l'IMC (indice de masse corporelle)
export function calculIMC(poids: number, taille: number): number {
  const tailleMetres = taille / 100;
  return +(poids / (tailleMetres * tailleMetres)).toFixed(1);
}

// Calcul estimé 1RM (one-rep max) selon charge et reps (formule Epley)
export function calc1RM(charge: number, reps: number): number {
  if (reps === 1) return charge;
  return Math.round(charge * (1 + 0.0333 * reps));
}

// Trouve le record absolu 1RM pour un exercice dans les suivis donnés
export function recordAbsolu1RM(suivis: any[], nomExercice: string): number | null {
  let max1RM: number | null = null;
  suivis.forEach(suivi => {
    const exo = suivi.exercices.find((e: any) => e.nom.toLowerCase() === nomExercice.toLowerCase());
    if (exo && exo.series.length) {
      exo.series.forEach((serie: any) => {
        const oneRM = calc1RM(serie.charge, serie.repetitions);
        if (!max1RM || oneRM > max1RM) {
          max1RM = oneRM;
        }
      });
    }
  });
  return max1RM;
}

// Trouve le dernier 1RM effectué pour un exercice dans les suivis donnés
export function dernier1RM(suivis: any[], nomExercice: string): number | null {
  const sorted = [...suivis].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  for (const suivi of sorted) {
    const exo = suivi.exercices.find(
      (e: any) => e.nom.toLowerCase() === nomExercice.toLowerCase()
    );
    if (exo && Array.isArray(exo.series) && exo.series.length) {
      const rmSeries = exo.series
        .filter(
          (serie: any) =>
            typeof serie.charge === "number" &&
            !isNaN(serie.charge) &&
            typeof serie.repetitions === "number" &&
            !isNaN(serie.repetitions)
        )
        .map((serie: any) => calc1RM(serie.charge, serie.repetitions));
      if (rmSeries.length > 0) {
        return Math.max(...rmSeries);
      }
    }
  }
  return null;
}
