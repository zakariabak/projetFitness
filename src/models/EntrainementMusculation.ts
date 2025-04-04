import mongoose, { Schema, Types } from 'mongoose';
import { IEntrainementMusculation } from '../common/IEntrainementMusculation';

const ExerciceSchema = new Schema({
  nom: { type: String, required: true },
  series: { type: Number, required: true },
  repetitions: { type: Number, required: true }
});

const EntrainementMusculationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true }, // ✅ Utilise Schema.Types.ObjectId
  nom: { type: String, required: true },
  exercices: { type: [ExerciceSchema], default: [] },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

export default mongoose.model<IEntrainementMusculation>(
  'EntrainementMusculation',
  EntrainementMusculationSchema
);
