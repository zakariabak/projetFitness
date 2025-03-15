// src/data/users.ts

// Interface de ton user de base (à ajuster si tu veux + d'infos)
export interface User {
    email: string;
    motDePasse: string;
    /* nom?: string;
    nomFamille?: string;
    username?: string;
    poids?: number;
    taille?: number;
    sexe?: string;
    dispos?: string[]; */
  }
  
  // Tableau qui stocke les utilisateurs en mémoire
  export const users: User[] = [];
  