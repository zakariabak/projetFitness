import { Request, Response } from 'express';
import SuiviMusculation from '../models/SuiviMusculation';
import { recordAbsolu1RM, dernier1RM } from '../models/utilitaires/calculs';

const main1RMExercises = [
  "Développé couché à la barre",
  "Squat à la barre libre",
  "Soulevé de terre à la barre"
];

interface AuthRequest extends Request {
  user?: { id: string };
}

export const getRecords1RM = async (req: AuthRequest, res: Response): Promise<void> => {
  if (!req.user?.id) {
    res.status(401).json({ message: "Non authentifié" });
    return;
  }

  try {
    const suivis = await SuiviMusculation.find({ userId: req.user.id });

    const records1RM: Record<string, { record: number | null, last: number | null }> = {};
    main1RMExercises.forEach(nom => {
      records1RM[nom] = {
        record: recordAbsolu1RM(suivis, nom),
        last: dernier1RM(suivis, nom)
      };
    });

    res.status(200).json({ records1RM });

  } catch (error) {
    console.error("Erreur getRecords1RM:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
