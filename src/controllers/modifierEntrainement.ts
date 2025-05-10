import { Request, Response } from 'express';
import EntrainementMusculation from '../models/EntrainementMusculation';
import mongoose from 'mongoose';
import { IExercice } from '../common/IEntrainementMusculation';
interface EntrainementBody {
    nom: string;
    exercices: IExercice[];
  }

interface AuthRequest extends Request {
  user?: { id: string };
  body: EntrainementBody;
}

export const modifierEntrainement = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { nom, exercices } = req.body;

  if (!req.user?.id) {
    res.status(401).json({ message: 'Utilisateur non authentifié' });
    return;
  }

  if (!nom || !Array.isArray(exercices)) {
    res.status(400).json({ message: 'Champs requis manquants : nom, exercices[]' });
    return;
  }

  try {
    const entrainement = await EntrainementMusculation.findById(id);

    if (!entrainement) {
      res.status(404).json({ message: 'Entraînement non trouvé' });
      return;
    }

    if (entrainement.userId.toString() !== req.user.id) {
      res.status(403).json({ message: 'Accès interdit' });
      return;
    }

    entrainement.nom = nom;
    entrainement.exercices = exercices;

    const updated = await entrainement.save();
    res.status(200).json({ message: ' Entraînement mis à jour', entrainement: updated });
  } catch (error) {
    console.error('Erreur dans modifierEntrainement :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
