

import { Document } from 'mongoose';
export interface IUser extends Document {
    nom: string;
    nomFamille: string;
    username: string;
    email: string;
    motDePasse: string;
    poids?: number;
    taille?: number;
    sexe?: string;
    dispo?: string;

    objectif?: string;
    poidsObjectif?: string;
    experience?: string;
    entrainement?: string;
    frequence?: string;
    planNutrition?: string;
    budget?: string;


    //ajout
    age?: number; 
    niveauActivite?: number; // 1.2 à 2.5 ou MET moyen

    //nutrition
    calories?: number;
proteines?: number;
lipides?: number;
glucides?: number;
imc?: number;


}

