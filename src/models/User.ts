/* interface User {
    nom: string;
    nomFamille: string;
    username: string;
    email: string;
    poids: number;
    taille: number;
    sexe: string;
    dispos: string[];
  } */

  // Simple type user pour simulation
export interface IUser {
  _id: string;
  nom: string;
  nomFamille: string;
  username: string;
  email: string;
  motDePasse: string; // ⚠️ hashé normalement, mais là on fait simple
  poids?: number;
  taille?: number;
  sexe?: string;
  dispo?: string;
  
}
