import mongoose, { Schema, Types } from 'mongoose';
import { IEntrainementMusculation } from '../common/IEntrainementMusculation';

// Schéma d'un exercice avec nom, nombre de séries et répétitions
const ExerciceSchema = new Schema({
  nom: { type: String, required: true },
  series: { type: Number, required: true },
  repetitions: { type: Number, required: true }
});

// Schéma d'un entraînement de musculation lié à un utilisateur
const EntrainementMusculationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // référence utilisateur
  nom: { type: String, required: true }, // nom de l'entraînement
  exercices: { type: [ExerciceSchema], default: [] }, // liste des exercices
  createdAt: { type: Date, default: Date.now } // date création
}, {
  timestamps: true // ajoute createdAt et updatedAt automatiques
});

export default mongoose.model<IEntrainementMusculation>(
  'EntrainementMusculation',
  EntrainementMusculationSchema
);
