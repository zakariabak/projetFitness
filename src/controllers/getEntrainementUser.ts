import { Request, Response, NextFunction } from 'express';
import EntrainementMusculation from '../models/EntrainementMusculation';

interface AuthRequest extends Request {
  user?: { id: string }; // user connecté
}

export const getEntrainementUser = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.user?.id) {
    // vérifie auth
    res.status(401).json({ message: 'Utilisateur non authentifié' });
    return;
  }

  try {
    // récupère tous les entraînements du user
    const entrainements = await EntrainementMusculation.find({ userId: req.user.id });
    res.status(200).json(entrainements);
  } catch (error) {
    console.error('Erreur dans getEntrainementUser :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
