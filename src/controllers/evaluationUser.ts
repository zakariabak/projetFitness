import { Request, Response } from 'express';
import User from '../models/User';
import {
  calculCalories,
  calculIMC,
  calculMacros,
  estimationDateObjectif
} from '../models/utilitaires/calculs';

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

    
    const toLocalDateOnly = (d: Date) => d.toLocaleDateString('fr-CA'); // format YYYY-MM-DD
    const date = updates.date ? new Date(updates.date) : new Date();
    const dateFormatee = toLocalDateOnly(date);
    const aujourdHui = toLocalDateOnly(new Date());

    if (!existingUser.poidsHistorique) {
      existingUser.poidsHistorique = [];
    }
    existingUser.poidsHistorique = existingUser.poidsHistorique.filter(entry =>
      toLocalDateOnly(new Date(entry.date)) !== dateFormatee
    );
    existingUser.poidsHistorique.push({ poids, date });

    if (dateFormatee === aujourdHui) {
      existingUser.poids = poids;
    }

    existingUser.imc = imc;
    existingUser.calories = calories;
    existingUser.proteines = proteines;
    existingUser.lipides = lipides;
    existingUser.glucides = glucides;


    let projection = null;
    const objectifNum = Number(existingUser.poidsObjectif);
    if (
      existingUser.poidsHistorique &&
      Array.isArray(existingUser.poidsHistorique) &&
      existingUser.poidsHistorique.length >= 2 &&
      !isNaN(objectifNum)
    ) {
      projection = estimationDateObjectif(existingUser.poidsHistorique, objectifNum);
    }

    console.log("Utilisateur final :", existingUser.toObject());
    await existingUser.save();

    const userObj = {
      _id: existingUser._id,
      nom: existingUser.nom,
      nomFamille: existingUser.nomFamille,
      username: existingUser.username,
      email: existingUser.email,
      poids: existingUser.poids,
      taille: existingUser.taille,
      sexe: existingUser.sexe,
      dispo: existingUser.dispo,
      objectif: existingUser.objectif,
      poidsObjectif: existingUser.poidsObjectif,
      experience: existingUser.experience,
      entrainement: existingUser.entrainement,
      frequence: existingUser.frequence,
      age: existingUser.age,
      niveauActivite: existingUser.niveauActivite,
      calories: existingUser.calories,
      proteines: existingUser.proteines,
      lipides: existingUser.lipides,
      glucides: existingUser.glucides,
      imc: existingUser.imc,
      poidsHistorique: existingUser.poidsHistorique || [],
      dateEstimeeObjectif: projection?.dateEstimee ?? null,
      pentePoids: projection?.details?.a ?? null,
      nbJoursRestant: projection?.details?.xObjectif ?? null
    };

    res.status(200).json({
      message: 'Utilisateur mis à jour avec succès après évaluation',
      user: userObj,
      calories
    });

  } catch (error) {
    console.error('Erreur dans evaluationUser:', error);
    console.error(error.stack);
    res.status(500).json({ error: "Erreur serveur lors de la mise à jour de l'utilisateur" });
  }
};
