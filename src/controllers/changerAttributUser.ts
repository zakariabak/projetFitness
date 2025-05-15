import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import { IUser } from '../common/IUser';
import express from 'express';


interface AuthRequest extends Request {
  user?: { id: string };
}

const allowedFields = [
  "nom", "nomFamille", "username", "email", "motDePasse", "poids", "taille",
  "sexe", "dispo", "objectif", "poidsObjectif", "experience", "entrainement",
  "frequence", "planNutrition", "budget", "age", "niveauActivite",
  
];

export const updateUserField = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  const { field, value } = req.body;

  if (!req.user?.id) {
    res.status(401).json({ message: 'Utilisateur non authentifié.' });
    return;
  }

  if (!field || typeof field !== 'string') {
    res.status(400).json({ message: 'Champ invalide.' });
    return;
  }

  if (!allowedFields.includes(field)) {
    res.status(400).json({ message: `Modification du champ '${field}' non autorisée.` });
    return;
  }

  try {
    const user = await User.findById(req.user.id) as IUser;

    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }

    // @ts-ignore
    user[field] = value;
    await user.save();

    res.json({ message: `Champ '${field}' mis à jour.`, user }); // pas de return ici
  } catch (error) {
    console.error('Erreur dans updateUserField:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
