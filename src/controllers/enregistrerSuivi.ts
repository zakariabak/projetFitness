import { Request, Response } from 'express';
import SuiviMusculation from '../models/SuiviMusculation';

interface SerieSuivi {
  charge: number;
  unite: 'kg' | 'lbs'; // unité poids
  repetitions: number; 
}

interface ExerciceSuivi {
  nom: string; // nom de l'exercice
  series: SerieSuivi[]; // séries effectuées
}

interface SuiviBody {
  entrainementId: string; // id de l'entraînement lié
  exercices: ExerciceSuivi[]; // liste des exercices
  date?: string; // date optionnelle du suivi
}

interface AuthRequest extends Request {
  user?: { id: string }; // user connecté
  body: SuiviBody; // corps attendu
}

export const enregistrerSuivi = async (req: AuthRequest, res: Response): Promise<void> => {
  const { entrainementId, exercices, date } = req.body; // extraction

  if (!req.user?.id) {
    // vérifie auth
    res.status(401).json({ message: 'Utilisateur non authentifié' });
    return;
  }

  if (!entrainementId || !Array.isArray(exercices)) {
    // check champs obligatoires
    res.status(400).json({ message: 'Champs requis manquants ou invalides' });
    return;
  }

  try {
    const dateUtilisee = date ? new Date(date) : new Date(); // date donnée ou maintenant
    const suivi = new SuiviMusculation({
      userId: req.user.id,
      entrainementId,
      exercices,
      date: dateUtilisee
    });

    const saved = await suivi.save(); // sauvegarde

    res.status(201).json({ message: 'Suivi enregistré', suivi: saved });
  } catch (error) {
    console.error('Erreur dans enregistrerSuivi :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
