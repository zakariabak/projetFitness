import { Request, Response } from 'express';
import SuiviMusculation from '../models/SuiviMusculation';

interface AuthRequest extends Request {
  user?: { id: string };
}
export const getProgressionParExercice = async (req: AuthRequest, res: Response) => {
  const { nomExercice } = req.params;

  try {
    const suivis = await SuiviMusculation.find({
      userId: req.user?.id,
      "exercices.nom": nomExercice
    }).sort({ date: 1 });

    const chargeParDate = new Map<string, number[]>();

    suivis.forEach(suivi => {
      const date = new Date(suivi.date).toISOString().split('T')[0];
      const exercice = suivi.exercices.find(e => e.nom === nomExercice);

      if (exercice) {
        const charges = exercice.series.map(serie => serie.charge).filter(c => !isNaN(c));
        if (!chargeParDate.has(date)) {
          chargeParDate.set(date, []);
        }
        chargeParDate.get(date)?.push(...charges);
      }
    });

    const historique = Array.from(chargeParDate.entries()).map(([date, charges]) => {
      const moyenne = charges.reduce((sum, val) => sum + val, 0) / charges.length;
      return {
        date,
        charge: parseFloat(moyenne.toFixed(2))  
      };
    });

    res.status(200).json({
      exercice: nomExercice,
      historique
    });

  } catch (error) {
    console.error("Erreur dans getProgressionParExercice :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

