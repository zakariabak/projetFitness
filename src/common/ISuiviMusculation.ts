import { Document, Types } from 'mongoose';

export interface ISerieSuivi {
  charge: number;
  unite: 'kg' | 'lbs';
  repetitions: number;
}

export interface IExerciceSuivi {
  nom: string;
  series: ISerieSuivi[];
}

export interface ISuiviMusculation extends Document {
  userId: Types.ObjectId;
  entrainementId: Types.ObjectId;
  date: Date;
  exercices: IExerciceSuivi[];
}
