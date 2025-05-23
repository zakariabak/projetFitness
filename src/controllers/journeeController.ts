import { Request, Response } from 'express';
import JourneeNutrition from '../models/JourneeNutrition';
import User from '../models/User';
import { getUserStatsAtDate } from '../models/utilitaires/getUserStatsAtDate';
import { startOfWeek, addDays, format } from 'date-fns';

interface IRepas {
  nom: string;
  calories: number;
  proteines: number;
  glucides: number;
  lipides: number;
}

interface AuthRequest extends Request {
  user?: { id: string };
  body: {
    date: string; // format YYYY-MM-DD
    caloriesBrulees: number;
    repas: IRepas[];
  };
}

// GET /user/jour/:date - récupère la journée nutrition pour un utilisateur à une date donnée
export const getJournee = async (req: AuthRequest, res: Response): Promise<void> => {
  const { date } = req.params;
  const userId = req.user?.id;

  try {
    let journee = await JourneeNutrition.findOne({ userId, date });

    if (!journee) {
      // si aucune journée existante, initialise avec objectifs calculés
      const user = await User.findById(userId);
      if (!user) {
        res.status(404).json({ message: "Utilisateur introuvable." });
        return;
      }

      const caloriesBrulees = 0;
      const stats = getUserStatsAtDate(user, date);
      journee = await JourneeNutrition.create({
        userId,
        date,
        caloriesBrulees,
        repas: [],
        objectifCalories: stats.calories,
        objectifProteines: stats.proteines,
        objectifGlucides: stats.glucides,
        objectifLipides: stats.lipides
      });

      console.log("Journée initialisée automatiquement :", journee);
    }

    res.status(200).json({ journee });
  } catch (err) {
    console.error("Erreur dans getJournee :", err);
    res.status(500).json({ message: 'Erreur serveur', error: err });
  }
};

// POST /user/jour - crée ou met à jour une journée nutrition
export const upsertJournee = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { date, caloriesBrulees, repas } = req.body;

  if (!userId || !date || !Array.isArray(repas)) {
    res.status(400).json({ message: 'Champs manquants ou invalides.' });
    return;
  }

  console.log("Requête POST reçue :", { userId, date, caloriesBrulees, repas });

  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).json({ message: "Utilisateur introuvable." });
      return;
    }

    const stats = getUserStatsAtDate(user, date);

    // mise à jour ou insertion de la journée avec objectifs recalculés
    const journee = await JourneeNutrition.findOneAndUpdate(
      { userId, date },
      {
        $set: {
          caloriesBrulees,
          repas,
          objectifCalories: stats.calories,
          objectifProteines: stats.proteines,
          objectifGlucides: stats.glucides,
          objectifLipides: stats.lipides
        }
      },
      { upsert: true, new: true }
    );

    res.status(200).json({ journee });
  } catch (err) {
    console.error("Erreur dans upsertJournee:", err);
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};

// Fonction utilitaire pour obtenir les dates (YYYY-MM-DD) d'une semaine ISO donnée
function getDatesOfISOWeek(week: number, year: number): string[] {
  const approximateDate = new Date(year, 0, 1 + (week - 1) * 7);
  const weekStart = startOfWeek(approximateDate, { weekStartsOn: 1 }); // lundi ISO
  const dates: string[] = [];

  for (let i = 0; i < 7; i++) {
    const current = addDays(weekStart, i);
    dates.push(format(current, "yyyy-MM-dd"));
  }

  return dates;
}

// GET journées nutrition d'une semaine spécifique pour l'utilisateur
export const getJourneesDeSemaine = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.id;
  const { annee, semaine } = req.params;

  if (!userId || !annee || !semaine) {
    res.status(400).json({ message: "Paramètres manquants." });
    return;
  }

  const dates = getDatesOfISOWeek(parseInt(semaine), parseInt(annee));

  try {
    const journees = await JourneeNutrition.find({
      userId,
      date: { $in: dates }
    });

    // création d'une map date => journée pour accès rapide
    const map = new Map(journees.map(j => [j.date, j]));

    // préparation du résumé des macronutriments par jour
    const result = dates.map(date => {
      const jour = map.get(date);
      return {
        date,
        proteines: jour?.repas?.reduce((sum, r) => sum + r.proteines, 0) || 0,
        glucides: jour?.repas?.reduce((sum, r) => sum + r.glucides, 0) || 0,
        lipides: jour?.repas?.reduce((sum, r) => sum + r.lipides, 0) || 0
      };
    });

    res.status(200).json(result);
  } catch (err) {
    console.error("Erreur getJourneesDeSemaine :", err);
    res.status(500).json({ message: "Erreur serveur", error: err });
  }
};
