

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
    }

    return Math.round(caloriesCible);
}

//Répartition  macro (en g par jour)
export function calculMacros(poids: number, calories: number) {
  const proteines = Math.round(poids * 2.2); // 2.2g/kg de poids 
  const lipides = Math.round(poids * 1);     // 1g/kg de poids 
  const caloriesRestantes = calories - (proteines * 4 + lipides * 9);
  const glucides = Math.round(caloriesRestantes / 4); // 4 kcal par g

  return { proteines, lipides, glucides };
}

// IMC
export function calculIMC(poids: number, taille: number): number {
  const tailleMetres = taille / 100;
  return +(poids / (tailleMetres * tailleMetres)).toFixed(1);
}





  
  
  