import { Request, Response } from 'express';
import SuiviMusculation from '../models/SuiviMusculation';

interface SerieSuivi {
  charge: number;
  unite: 'kg' | 'lbs';
  repetitions: number;
}

interface ExerciceSuivi {
  nom: string;
  series: SerieSuivi[];
}

interface SuiviBody {
  entrainementId: string;
  exercices: ExerciceSuivi[];
  date?: string; 
}

interface AuthRequest extends Request {
  user?: { id: string };
  body: SuiviBody;
}

export const enregistrerSuivi = async (req: AuthRequest, res: Response): Promise<void> => {
  const { entrainementId, exercices, date } = req.body;

  if (!req.user?.id) {
    res.status(401).json({ message: 'Utilisateur non authentifié' });
    return;
  }

  if (!entrainementId || !Array.isArray(exercices)) {
    res.status(400).json({ message: 'Champs requis manquants ou invalides' });
    return;
  }

  try {
    const dateUtilisee = date ? new Date(date) : new Date(); 
    const suivi = new SuiviMusculation({
      userId: req.user.id,
      entrainementId,
      exercices,
      date: dateUtilisee
    });

    const saved = await suivi.save();

    res.status(201).json({ message: 'Suivi enregistré', suivi: saved });
  } catch (error) {
    console.error('Erreur dans enregistrerSuivi :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
