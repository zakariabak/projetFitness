import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import EntrainementMusculation from '../models/EntrainementMusculation';

export const creerEntrainement = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { userId, nom, exercices } = req.body;

  // 🔒 Vérifie que userId est valide
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: '❌ userId invalide ou manquant' });
    return;
  }

  if (!nom || !Array.isArray(exercices)) {
    res.status(400).json({ message: '❌ Champs requis manquants : nom, exercices[]' });
    return;
  }

  console.log("📥 Reçu du frontend :", req.body);

  try {
    const nouvelEntrainement = new EntrainementMusculation({
      userId: new mongoose.Types.ObjectId(userId),
      nom,
      exercices
    });

    const saved = await nouvelEntrainement.save();
    console.log("✅ Entraînement enregistré pour user :", userId);

    res.status(201).json({ message: 'Entrainement enregistré avec succès ✅', entrainement: saved });
  } catch (error) {
    console.error('❌ Erreur dans creerEntrainement :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
