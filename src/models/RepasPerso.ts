import mongoose, { Schema, Document } from 'mongoose';

export interface IRepas extends Document {
  userId: mongoose.Types.ObjectId;
  nom: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
}

const RepasSchema = new Schema<IRepas>({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  nom: { type: String, required: true },
  calories: { type: Number, required: true },
  proteines: { type: Number, required: true },
  glucides: { type: Number, required: true },
  lipides: { type: Number, required: true },
});

export default mongoose.model<IRepas>('RepasPerso', RepasSchema);
