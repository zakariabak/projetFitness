import mongoose, { Schema, Document } from 'mongoose';

export interface IRepas extends Document {
  userId: mongoose.Types.ObjectId; // référence utilisateur
  nom: string;                     // nom du repas
  calories: number;                // calories totales
  proteines: number;               // protéines en grammes
  glucides: number;                // glucides en grammes
  lipides: number;                 // lipides en grammes
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
