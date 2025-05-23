import mongoose, { Schema } from 'mongoose';
import { ISuiviMusculation } from '../common/ISuiviMusculation';

// Schéma d'une série : charge, unité, répétitions
const SerieSchema = new Schema({
  charge: { type: Number, required: true },
  unite: { type: String, enum: ['kg', 'lbs'], default: 'kg' },
  repetitions: { type: Number, required: true }
});

// Schéma d'un exercice suivi : nom et ses séries
const ExerciceSuiviSchema = new Schema({
  nom: { type: String, required: true },
  series: { type: [SerieSchema], required: true }
});

// Schéma d'un suivi de musculation lié à un user et un entraînement
const SuiviMusculationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true }, // utilisateur
  entrainementId: { type: Schema.Types.ObjectId, ref: 'EntrainementMusculation', required: true }, // entraînement associé
  date: { type: Date, default: Date.now }, // date du suivi
  exercices: { type: [ExerciceSuiviSchema], required: true } // liste des exercices suivis
});

export default mongoose.model<ISuiviMusculation>('SuiviMusculation', SuiviMusculationSchema);
