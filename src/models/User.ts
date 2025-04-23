
import mongoose, { Schema } from 'mongoose';
import { IUser } from '../common/IUser';

const UserSchema: Schema<IUser> = new Schema(
  {
    nom: { type: String, required: true },
    nomFamille: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    motDePasse: { type: String, required: true },
    poids: { type: Number, default: null },
    taille: { type: Number, default: null },
    sexe: { type: String, default: null },
    dispo: { type: String, default: null },
    objectif: { type: String, default: null },
    poidsObjectif: { type: String, default: null },
    experience: { type: String, default: null },
    entrainement: { type: String, default: null },
    frequence: { type: String, default: null },
    planNutrition: { type: String, default: null },
    budget: { type: String, default: null },

    age: { type: Number, default: null },
    niveauActivite: { type: Number, default: null },

    calories: { type: Number, default: null },
proteines: { type: Number, default: null },
lipides: { type: Number, default: null },
glucides: { type: Number, default: null },
imc: { type: Number, default: null },



  },
  {
    timestamps: true
  }
);

export default mongoose.model<IUser>('User', UserSchema); 