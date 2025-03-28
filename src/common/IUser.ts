

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
}

