import { Request, Response } from 'express';
import SuiviMusculation from '../models/SuiviMusculation';

interface AuthRequest extends Request {
  user?: { id: string }; // id utilisateur connecté
}

export const deleteSuivi = async (req: AuthRequest, res: Response): Promise<void> => {
  const suiviId = req.params.id; // id suivi à supprimer

  try {
    const suivi = await SuiviMusculation.findById(suiviId); // chercher suivi

    if (!suivi) {
      // vérifie existence
      res.status(404).json({ message: "Suivi non trouvé" });
      return;
    }

    if (suivi.userId.toString() !== req.user?.id) {
      // vérifier que c'est bien le user propriétaire
      res.status(403).json({ message: "Accès interdit" });
      return;
    }

    await SuiviMusculation.findByIdAndDelete(suiviId); // suppression en DB
    res.status(200).json({ message: "Suivi supprimé" });
  } catch (error) {
    console.error("Erreur dans deleteSuivi :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
