import { Document, Types } from 'mongoose';

export interface IExercice {
  nom: string;
  series: number;
  repetitions: number;
}

export interface IEntrainementMusculation extends Document {
  userId: Types.ObjectId;
  nom: string;
  exercices: IExercice[];
  createdAt: Date;
}
