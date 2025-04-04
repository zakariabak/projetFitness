import { Request, Response, NextFunction } from 'express';
import EntrainementMusculation from '../models/EntrainementMusculation';

export const getEntrainementUser = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const userId = req.params.userId;

  if (!userId) {
    res.status(400).json({ message: 'userId requis dans l’URL' });
    return;
  }

  try {
    const entrainements = await EntrainementMusculation.find({ userId });
    res.status(200).json(entrainements);
  } catch (error) {
    console.error('❌ Erreur dans getEntrainementUser :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
