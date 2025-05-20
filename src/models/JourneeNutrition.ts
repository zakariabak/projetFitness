import mongoose, { Schema, Document } from 'mongoose';

interface IRepas {
  nom: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
}

export interface IJourneeNutrition extends Document {
  userId: mongoose.Types.ObjectId;
  date: string; // format YYYY-MM-DD
  caloriesBrulees: number;
  repas: IRepas[];

objectifCalories: number;
objectifProteines: number;
objectifGlucides: number;
objectifLipides: number;
}

const JourneeSchema = new Schema<IJourneeNutrition>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: String, required: true },
  caloriesBrulees: { type: Number, default: 0 },
  repas: [
    {
      nom: { type: String, required: true },
      calories: { type: Number, required: true },
      proteines: { type: Number, required: true },
      glucides: { type: Number, required: true },
      lipides: { type: Number, required: true },
    }
  ],
    objectifCalories: { type: Number, required: true },
    objectifProteines: { type: Number, required: true },
    objectifGlucides: { type: Number, required: true },
    objectifLipides: { type: Number, required: true },
});

JourneeSchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model<IJourneeNutrition>('JourneeNutrition', JourneeSchema);
