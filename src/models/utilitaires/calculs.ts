

//calcul metabolisme, et carolies a cibler en fct des infos
export function calculCalories(
    poids: number,              
    taille: number,           
    age: number,                
    sexe: string,          
    niveauActivite: number,     
    objectif: string            
  ) {
    let metabolisme = 0;
  
    
    if (sexe === "Homme") {
      metabolisme = 10 * poids + 6.25 * taille - 5 * age + 5;
    } else {
      metabolisme = 10 * poids + 6.25 * taille - 5 * age - 161;
    }
  
    
    const tdee = metabolisme * niveauActivite;
  
    
    let caloriesCible = tdee;
    if (objectif === "Perdre du poids") {
      caloriesCible = tdee - 300; // déficit calorique
    } else if (objectif === "Gagner du muscle") {
      caloriesCible = tdee + 300; // surplus calorique
    } else if  (objectif === "Garder la forme") {
      caloriesCible = tdee
    }

    return Math.round(caloriesCible);
}


export function calculMacros(poids: number, calories: number) {
  const proteines = Math.round(poids * 2.2); 
  const lipides = Math.round(poids * 1);    
  const caloriesRestantes = calories - (proteines * 4 + lipides * 9);
  const glucides = Math.round(caloriesRestantes / 4); 

  return { proteines, lipides, glucides };
}


export function estimationDateObjectif(
  poidsHistorique: { poids: number; date: Date | string }[],
  poidsObjectif: number
): { dateEstimee: Date | null, details?: any } {
  if (!poidsHistorique || poidsHistorique.length < 2 || !poidsObjectif) {
    return { dateEstimee: null };
  }

  const sortedByDate = [...poidsHistorique].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );
  const recent = sortedByDate.slice(-4);

  const sorted = [...recent]
    .map(p => ({
      poids: p.poids,
      x: typeof p.date === "string" ? new Date(p.date).getTime() : p.date.getTime()
    }))
    .sort((a, b) => a.x - b.x);

  
  const x0 = sorted[0].x;
  const data = sorted.map(p => ({
    x: (p.x - x0) / (1000 * 3600 * 24), 
    y: p.poids
  }));

  const n = data.length;
  const sumX = data.reduce((acc, d) => acc + d.x, 0);
  const sumY = data.reduce((acc, d) => acc + d.y, 0);
  const sumXY = data.reduce((acc, d) => acc + d.x * d.y, 0);
  const sumXX = data.reduce((acc, d) => acc + d.x * d.x, 0);

  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) return { dateEstimee: null };

  const a = (n * sumXY - sumX * sumY) / denominator;
  const b = (sumY * sumXX - sumX * sumXY) / denominator;

  if (a === 0) return { dateEstimee: null };

  const xObjectif = (poidsObjectif - b) / a;

  if (xObjectif < 0) return { dateEstimee: null };

  const dateEstimee = new Date(x0 + xObjectif * 24 * 3600 * 1000);

  return {
    dateEstimee,
    details: { a, b, xObjectif }
  };
}


// IMC
export function calculIMC(poids: number, taille: number): number {
  const tailleMetres = taille / 100;
  return +(poids / (tailleMetres * tailleMetres)).toFixed(1);
}

export function calc1RM(charge, reps) {
  if (reps === 1) return charge;
  return Math.round(charge * (1 + 0.0333 * reps));
}

export function recordAbsolu1RM(suivis, nomExercice) {
  let max1RM = null;
  suivis.forEach(suivi => {
    const exo = suivi.exercices.find(e => e.nom.toLowerCase() === nomExercice.toLowerCase());
    if (exo && exo.series.length) {
      exo.series.forEach(serie => {
        const oneRM = calc1RM(serie.charge, serie.repetitions);
        if (!max1RM || oneRM > max1RM) {
          max1RM = oneRM;
        }
      });
    }
  });
  return max1RM;
}

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






  
  
  