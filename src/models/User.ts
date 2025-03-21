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
/* export interface IUser {
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

*/

import mongoose, { Schema, Document } from 'mongoose';

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
}

const UserSchema: Schema = new Schema({
    nom: { type: String, required: true },
    nomFamille: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    poids: { type: Number, default: null },
    taille: { type: Number, default: null },
    sexe: { type: String, default: null },
    dispo: { type: String, default: null },
}, {
    timestamps: true
});

export default mongoose.model<IUser>('User', UserSchema);
