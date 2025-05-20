import { IUser } from '../../common/IUser'; // ou ajuste selon ton projet
import { calculCalories, calculMacros } from './calculs';

export function getUserStatsAtDate(user: IUser, date: string) {
    console.log("🧠 Appel à getUserStatsAtDate() pour la date :", date);
  const dateObj = new Date(date);

  // ⚠️ poidsHistorique trié dans l’ordre croissant
  const poidsHistorique = [...user.poidsHistorique || []]
    .filter(entry => new Date(entry.date) <= dateObj)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const poids = poidsHistorique.length > 0
  ? poidsHistorique[0].poids ?? 0 // ou une valeur par défaut 
  : user.poids ?? 0;

 const taille = user.taille ?? 0;
const age = user.age ?? 0;
const sexe = user.sexe ?? "Homme";
const niveauActivite = user.niveauActivite ?? 0;
const objectif = user.objectif ?? "Garder la forme";

  const calories = calculCalories(poids, taille, age, sexe, niveauActivite, objectif);
  const macros = calculMacros(poids,calories);

  console.log("📊 [getUserStatsAtDate] Calcul pour la date :", date);
  console.log("  ➤ Poids retenu :", poids);
  console.log("  ➤ Données utilisateur :");
  console.log("     - Taille :", taille);
  console.log("     - Âge :", age);
  console.log("     - Sexe :", sexe);
  console.log("     - Activité :", niveauActivite);
  console.log("     - Objectif :", objectif);
  console.log("  ➤ Résultat calculs :");
  console.log("     - Calories :", calories);
  console.log("     - Protéines :", macros.proteines);
  console.log("     - Glucides :", macros.glucides);
  console.log("     - Lipides :", macros.lipides);


  return {
    poids,
    calories,
    proteines: macros.proteines,
    glucides: macros.glucides,
    lipides: macros.lipides
  };
}
