import mongoose, { Schema } from 'mongoose';
import { IUser } from '../common/IUser';

// Schéma utilisateur avec champs personnels et nutritionnels
const UserSchema: Schema<IUser> = new Schema(
  {
    nom: { type: String, required: true },
    nomFamille: { type: String, required: true },
    username: { type: String, required: true, unique: true }, // identifiant unique
    email: { type: String, required: true, unique: true },    // email unique
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

    age: { type: Number, default: null },
    niveauActivite: { type: Number, default: null },

    calories: { type: Number, default: null },    // calories cibles
    proteines: { type: Number, default: null },   // apports en protéines
    lipides: { type: Number, default: null },     // apports en lipides
    glucides: { type: Number, default: null },    // apports en glucides
    imc: { type: Number, default: null },         // indice masse corporelle

    // Historique du poids avec date associée
    poidsHistorique: {
      type: [
        {
          poids: { type: Number, required: true },
          date: { type: Date, required: true }
        }
      ],
      default: []
    }
  },
  {
    timestamps: true // ajoute createdAt et updatedAt automatiquement
  }
);

export default mongoose.model<IUser>('User', UserSchema);
