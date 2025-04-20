import mongoose, { Schema } from 'mongoose';
import { ISuiviMusculation } from '../common/ISuiviMusculation';

const SerieSchema = new Schema({
  charge: { type: Number, required: true },
  unite: { type: String, enum: ['kg', 'lbs'], default: 'kg' },
  repetitions: { type: Number, required: true }
});

const ExerciceSuiviSchema = new Schema({
  nom: { type: String, required: true },
  series: { type: [SerieSchema], required: true }
});

const SuiviMusculationSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  entrainementId: { type: Schema.Types.ObjectId, ref: 'EntrainementMusculation', required: true },
  date: { type: Date, default: Date.now },
  exercices: { type: [ExerciceSuiviSchema], required: true }
});

export default mongoose.model<ISuiviMusculation>('SuiviMusculation', SuiviMusculationSchema);
