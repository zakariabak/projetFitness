import { Request, Response } from 'express';
import EntrainementMusculation from '../models/EntrainementMusculation';

interface AuthRequest extends Request {
  user?: { id: string }; // user connecté
}

export const deleteEntrainement = async (req: AuthRequest, res: Response): Promise<void> => {
  const entrainementId = req.params.id; // id dans l'URL

  try {
    const entrainement = await EntrainementMusculation.findById(entrainementId); // récupère entraînement

    if (!entrainement) {
      // check existence
      res.status(404).json({ message: "Entraînement non trouvé" });
      return;
    }

    if (entrainement.userId.toString() !== req.user?.id) {
      // check que user est proprio
      res.status(403).json({ message: "Accès interdit" });
      return;
    }

    await EntrainementMusculation.findByIdAndDelete(entrainementId); // supprime en DB
    res.status(200).json({ message: "Entraînement supprimé avec succès" });
  } catch (error) {
    console.error("Erreur dans deleteEntrainement :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
