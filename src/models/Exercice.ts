import mongoose, { Schema } from 'mongoose';
import { IExercice } from '../common/IExercice';

const ExerciceSchema: Schema<IExercice> = new Schema({
  nom: { type: String, required: true },
  groupeMusculaire: { type: String, required: true },
  description: { type: String, default: '' }
});

export const Exercice = mongoose.model<IExercice>('Exercice', ExerciceSchema);
