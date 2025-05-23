import { Request, Response } from 'express';
import EntrainementMusculation from '../models/EntrainementMusculation';
import mongoose from 'mongoose';
import { IExercice } from '../common/IEntrainementMusculation';

interface EntrainementBody {
  nom: string;
  exercices: IExercice[];
}

interface AuthRequest extends Request {
  user?: { id: string }; // user connecté
  body: EntrainementBody; // corps attendu
}

export const modifierEntrainement = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params; // id entraînement à modifier
  const { nom, exercices } = req.body; // nouvelles données

  if (!req.user?.id) {
    // vérifie authentification
    res.status(401).json({ message: 'Utilisateur non authentifié' });
    return;
  }

  if (!nom || !Array.isArray(exercices)) {
    // vérifie présence des champs nécessaires
    res.status(400).json({ message: 'Champs requis manquants : nom, exercices[]' });
    return;
  }

  try {
    const entrainement = await EntrainementMusculation.findById(id);

    if (!entrainement) {
      // vérifie que l'entraînement existe
      res.status(404).json({ message: 'Entraînement non trouvé' });
      return;
    }

    if (entrainement.userId.toString() !== req.user.id) {
      // vérifie que le user est propriétaire
      res.status(403).json({ message: 'Accès interdit' });
      return;
    }

    // mise à jour des champs
    entrainement.nom = nom;
    entrainement.exercices = exercices;

    const updated = await entrainement.save(); // sauvegarde en DB
    res.status(200).json({ message: 'Entraînement mis à jour', entrainement: updated });
  } catch (error) {
    console.error('Erreur dans modifierEntrainement :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
