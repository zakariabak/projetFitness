import { Request, Response, NextFunction } from 'express';
import { Exercice } from '../models/Exercice';

export const getAllExercices = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  Exercice.find()
    .then((exercices) => {
      if (!exercices.length) {
        res.status(404).json({
          message: "Aucun exercice trouvé dans la base de données.",
        });
        return;
      }

      res.status(200).json({
        message: "Liste des exercices récupérée avec succès",
        count: exercices.length,
        data: exercices,
      });
    })
    .catch((error) => {
      console.error("Erreur dans getAllExercices :", error);
      res.status(500).json({
        message: "Erreur lors de la récupération des exercices",
        error,
      });
    });
};
