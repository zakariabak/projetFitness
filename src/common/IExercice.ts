import { Document } from 'mongoose';

export interface IExercice extends Document {
  nom: string;
  groupeMusculaire: string;
  description?: string;
}
