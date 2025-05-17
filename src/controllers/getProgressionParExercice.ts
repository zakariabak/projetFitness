import { Request, Response } from 'express';
import SuiviMusculation from '../models/SuiviMusculation';
import { calc1RM, recordAbsolu1RM, dernier1RM } from '../models/utilitaires/calculs';

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

    const progression = suivis.map(suivi => {
      const date = new Date(suivi.date).toISOString().split('T')[0];
      const exercice = suivi.exercices.find(e => e.nom === nomExercice);

      if (!exercice) return null;

      const series = exercice.series.map(serie => ({
        charge: serie.charge,
        repetitions: serie.repetitions
      }));

      const moyenne = series.length > 0
        ? (series.reduce((sum, s) => sum + s.charge, 0) / series.length)
        : null;

      const best1RM = series.length > 0
        ? Math.max(...series.map(s => calc1RM(s.charge, s.repetitions)))
        : null;

      return {
        date,
        chargeMoyenne: moyenne !== null ? parseFloat(moyenne.toFixed(2)) : null,
        series 
      };
    }).filter(Boolean);

    const record = recordAbsolu1RM(suivis, nomExercice);
    const last = dernier1RM(suivis, nomExercice);

    res.status(200).json({
      exercice: nomExercice,
      progression,             
      recordAbsolu1RM: record, 
      dernier1RM: last         
    });

  } catch (error) {
    console.error("Erreur dans getProgressionParExercice :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
