import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import EntrainementMusculation from '../models/EntrainementMusculation';
import { IExercice } from '../common/IEntrainementMusculation';

interface EntrainementBody {
  nom: string;
  exercices: IExercice[];
}
interface AuthRequest extends Request {
  user?: { id: string }; // user connecté
  body: EntrainementBody; // corps attendu
}

export const creerEntrainement = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { nom, exercices } = req.body; // extraire données

  if (!req.user?.id) {
    // vérifie authentification
    res.status(401).json({ message: 'Utilisateur non authentifié' });
    return;
  }

  if (!nom || !Array.isArray(exercices)) {
    // vérifie présence champs
    res.status(400).json({ message: 'Champs requis manquants : nom, exercices[]' });
    return;
  }

  try {
    const nouvelEntrainement = new EntrainementMusculation({
      userId: new mongoose.Types.ObjectId(req.user.id), // conversion id mongoose
      nom,
      exercices,
    });

    const saved = await nouvelEntrainement.save(); // sauvegarde en DB
    res.status(201).json({ message: '✅ Entrainement enregistré', entrainement: saved });
  } catch (error) {
    console.error(' Erreur dans creerEntrainement :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
