import { Request, Response } from "express";
import SuiviMusculation from "../models/SuiviMusculation";

interface AuthRequest extends Request {
  user?: { id: string };
}

export const getSuivisUser = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      res.status(401).json({ message: "Non autorisé" });
      return;
    }

    const suivis = await SuiviMusculation.find({ userId })
      .sort({ date: -1 }) // Tri du plus récent au plus ancien
      .lean();

    res.status(200).json(suivis);
  } catch (error) {
    console.error("Erreur getSuivisUser :", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};
