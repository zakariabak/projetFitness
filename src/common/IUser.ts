

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


    age?: number; 
    niveauActivite?: number; 

 
    calories?: number;
    proteines?: number;
    lipides?: number;
    glucides?: number;
    imc?: number;

     poidsHistorique?: {
        _id?: string;
        poids: number;
        date: Date;
        
    }[];

}

