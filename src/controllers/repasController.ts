import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import RepasPerso from '../models/RepasPerso';

interface AuthRequest extends Request {
  user?: { id: string }; // utilisateur connecté
}

// récupère tous les repas personnalisés d'un utilisateur
export const getRepasUtilisateur = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user?.id) {
    // vérifie authentification
    res.status(401).json({ message: "Utilisateur non authentifié" });
    return;
  }

  try {
    const repas = await RepasPerso.find({ userId: req.user.id });
    res.status(200).json({ repas });
  } catch (error) {
    console.error("Erreur dans getRepasUtilisateur :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// supprime un repas personnalisé par son id et userId
export const supprimerRepas = async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  if (!req.user?.id) {
    res.status(401).json({ message: "Non authentifié" });
    return;
  }

  try {
    const repas = await RepasPerso.findOneAndDelete({
      _id: id,
      userId: req.user.id
    });

    if (!repas) {
      res.status(404).json({ message: "Repas non trouvé" });
      return;
    }

    res.status(200).json({ message: "Repas supprimé" });
  } catch (error) {
    console.error("Erreur dans supprimerRepas :", error);
    res.status(500).json({ message: "Erreur serveur" });
  }
};

// création d'un nouveau repas personnalisé
export const creerRepas = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { nom, calories, proteines, glucides, lipides } = req.body;

  if (!req.user?.id) {
    res.status(401).json({ message: 'Utilisateur non authentifié' });
    return;
  }

  if (!nom || calories == null || proteines == null || glucides == null || lipides == null) {
    // vérifie présence de tous les champs obligatoires
    res.status(400).json({ message: 'Champs requis manquants' });
    return;
  }

  try {
    const repas = new RepasPerso({
      userId: new mongoose.Types.ObjectId(req.user.id), // conversion id mongoose
      nom,
      calories,
      proteines,
      glucides,
      lipides,
    });

    const saved = await repas.save();
    res.status(201).json({ message: 'Repas enregistré', repas: saved });
  } catch (error) {
    console.error("Erreur dans creerRepas :", error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
