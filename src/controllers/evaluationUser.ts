import { Request, Response } from 'express';
import User from '../models/User';
import { calculCalories, calculIMC, calculMacros } from '../models/utilitaires/calculs';



export const evaluationUser = async (req: Request, res: Response): Promise<void> => {
  console.log("PUT /evaluation/:id appelé !");
  console.log("Body reçu :", req.body);
  console.log("ID reçu :", req.params.id);

  const userId = req.params.id;
  const updates = req.body;

  try {
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      res.status(404).json({ error: 'Utilisateur non trouvé' });
      return;
    }


    const champsEvaluation = {
      objectif: updates.objectif,
      experience: updates.experience,
      entrainement: updates.entrainement,
      frequence: updates.frequence,
      planNutrition: updates.planNutrition,
      sexe: updates.sexe,
      taille: updates.taille,
      niveauActivite: updates.niveauActivite,
      dispo: updates.dispo,
      age: updates.age,
      poidsObjectif: updates.poidsObjectif
    };


    for (const [key, value] of Object.entries(champsEvaluation)) {
      if (value !== undefined && value !== null) {
        existingUser[key] = value;
      }
    }



    const poids = parseInt(updates.poids);
    if (isNaN(poids)) {
      res.status(400).json({ error: "Le poids est requis et doit être un nombre." });
      return;
    }

    

    const { taille, age, sexe, niveauActivite, objectif } = existingUser;
    if (!taille || !age || !sexe || !niveauActivite || !objectif) {
      res.status(400).json({ error: "Profil incomplet pour effectuer les calculs (âge, taille, sexe, objectif, etc.)." });
      return;
    }

    const calories = calculCalories(poids, taille, age, sexe, niveauActivite, objectif);
    const imc = calculIMC(poids, taille);
    const { proteines, lipides, glucides } = calculMacros(poids, calories);
  

    updates.calories = calories;

    
    updates.imc = imc;
    updates.proteines = proteines;
    updates.lipides = lipides;
    updates.glucides = glucides;

    const toLocalDateOnly = (d: Date) => d.toLocaleDateString('fr-CA'); // format YYYY-MM-DD
    const date = updates.date ? new Date(updates.date) : new Date();
    const dateFormatee = toLocalDateOnly(date);
    const aujourdHui = toLocalDateOnly(new Date());

    if (!existingUser.poidsHistorique) {
      existingUser.poidsHistorique = [];
    }

    // Supprimer l'ancien poids pour cette date (s'il existe déjà)
    existingUser.poidsHistorique = existingUser.poidsHistorique.filter(entry =>
      toLocalDateOnly(new Date(entry.date)) !== dateFormatee
    );

    // Ajouter le nouveau poids
    existingUser.poidsHistorique.push({ poids, date });

    // ✅ Mettre à jour le poids *actuel* uniquement si c'est pour aujourd'hui
    if (dateFormatee === aujourdHui) {
      existingUser.poids = poids;
    }

    // Mise à jour du poids + stats
    existingUser.imc = imc;
    existingUser.calories = calories;
    existingUser.proteines = proteines;
    existingUser.lipides = lipides;
    existingUser.glucides = glucides;


    console.log("Utilisateur final :", existingUser.toObject());
    await existingUser.save();

    res.status(200).json({
      message: 'Utilisateur mis à jour avec succès après évaluation',
      user: existingUser,
      calories
    });
  } catch (error) {
    console.error('Erreur dans evaluationUser:', error);
    console.error(error.stack);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour de l'utilisateur" });
  }
};
