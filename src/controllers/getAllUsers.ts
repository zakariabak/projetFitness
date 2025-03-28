import { Request, Response, NextFunction } from 'express';
import { users } from '../data/users';


export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!users.length) {
      res.status(404).json({
        message: "Aucun utilisateur inscrit pour le moment."
      });
      return; 
    }

    res.status(200).json({
      message: "Liste des utilisateurs récupérée avec succès ✅",
      count: users.length,
      data: users
    });
  } catch (error) {
    res.status(500).json({
      message: "Erreur lors de la récupération des utilisateurs ❌",
      error
    });
  }
};
