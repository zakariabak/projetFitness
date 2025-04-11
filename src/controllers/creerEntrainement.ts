import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import EntrainementMusculation from '../models/EntrainementMusculation';

interface EntrainementBody {
  nom: string;
  exercices: { nom: string; series: number; repetitions: number }[];
}

interface AuthRequest extends Request {
  user?: { id: string };
  body: EntrainementBody;
}

export const creerEntrainement = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
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
    const nouvelEntrainement = new EntrainementMusculation({
      userId: new mongoose.Types.ObjectId(req.user.id),
      nom,
      exercices,
    });

    const saved = await nouvelEntrainement.save();
    res.status(201).json({ message: '✅ Entrainement enregistré', entrainement: saved });
  } catch (error) {
    console.error('❌ Erreur dans creerEntrainement :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};


/* import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import EntrainementMusculation from '../models/EntrainementMusculation';

export const creerEntrainement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId, nom, exercices } = req.body;

  // 🔒 Vérifie que userId est valide
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: '❌ userId invalide ou manquant' });
    return;
  }

  if (!nom || !Array.isArray(exercices)) {
    res.status(400).json({ message: '❌ Champs requis manquants : nom, exercices[]' });
    return;
  }

  console.log("📥 Reçu du frontend :", req.body);

  try {
    const nouvelEntrainement = new EntrainementMusculation({
      userId: new mongoose.Types.ObjectId(userId),
      nom,
      exercices
    });

    const saved = await nouvelEntrainement.save();
    console.log("✅ Entraînement enregistré pour user :", userId);

    res.status(201).json({ message: 'Entrainement enregistré avec succès ✅', entrainement: saved });
  } catch (error) {
    console.error('❌ Erreur dans creerEntrainement :', error);
    res.status(500).json({ message: 'Erreur serveur', error }); 
  }
};
*/

