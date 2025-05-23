import { Request, Response, NextFunction } from 'express';
import User from '../models/User';
import SuiviMusculation from '../models/SuiviMusculation'; // modèle suivi muscu
import { IUser } from '../common/IUser';
import {
  calculCalories,
  calculIMC,
  calculMacros,
  estimationDateObjectif,
  recordAbsolu1RM,
  dernier1RM
} from '../models/utilitaires/calculs';

interface AuthRequest extends Request {
  user?: { id: string }; // ajout id user dans request
}

const allowedFields = [
  "nom", "nomFamille", "username", "email", "motDePasse", "poids", "taille",
  "sexe", "dispo", "objectif", "poidsObjectif", "experience", "entrainement",
  "frequence", "planNutrition", "budget", "age", "niveauActivite",
]; // champs modifiables

const main1RMExercises = [
  "Développé couché à la barre",
  "Squat à la barre libre",
  "Soulevé de terre à la barre"
]; // exercices 1RM principaux

export const updateUserField = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { field, value, date } = req.body; // données reçues

  if (!req.user?.id) {
    // check auth
    res.status(401).json({ message: 'Utilisateur non authentifié.' });
    return;
  }

  if (!field || typeof field !== 'string') {
    // check validité champ
    res.status(400).json({ message: 'Champ invalide.' });
    return;
  }

  if (!allowedFields.includes(field)) {
    // interdiction champs non autorisés
    res.status(400).json({ message: `Modification du champ '${field}' non autorisée.` });
    return;
  }

  try {
    const user = await User.findById(req.user.id) as IUser;

    if (!user) {
      // check user existe
      res.status(404).json({ message: 'Utilisateur non trouvé.' });
      return;
    }

    user[field] = value; // mise à jour champ

    if (field === "poids") {
      // si poids modifié, mise à jour historique
      let entryDate = date ? new Date(date) : new Date();
      const dateStr = entryDate.toISOString().split('T')[0];

      if (!user.poidsHistorique) user.poidsHistorique = [];

      // suppression éventuelle d'une entrée du même jour
      user.poidsHistorique = user.poidsHistorique.filter(entry => {
        const entryDateStr = new Date(entry.date).toISOString().split('T')[0];
        return entryDateStr !== dateStr;
      });

      user.poidsHistorique.push({
        poids: value,
        date: entryDate
      });

      // trouve entrée la plus récente
      let mostRecentEntry = user.poidsHistorique[0];
      user.poidsHistorique.forEach(entry => {
        if (new Date(entry.date) > new Date(mostRecentEntry.date)) {
          mostRecentEntry = entry;
        }
      });

      user.poids = mostRecentEntry.poids; // poids à jour

      // recalcul des macros si données complètes
      if (
        user.taille &&
        user.age &&
        user.sexe &&
        user.niveauActivite &&
        user.objectif
      ) {
        const poidsNum = Number(user.poids);
        const calories = calculCalories(poidsNum, user.taille, user.age, user.sexe, user.niveauActivite, user.objectif);
        const imc = calculIMC(poidsNum, user.taille);
        const { proteines, lipides, glucides } = calculMacros(poidsNum, calories);
        user.calories = calories;
        user.imc = imc;
        user.proteines = proteines;
        user.lipides = lipides;
        user.glucides = glucides;
      }
      // trie historique par date croissante
      user.poidsHistorique.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }

    let projection = null;
    const objectifNum = Number(user.poidsObjectif);
    // estimation date objectif si possible
    if (
      user.poidsHistorique &&
      Array.isArray(user.poidsHistorique) &&
      user.poidsHistorique.length >= 2 &&
      !isNaN(objectifNum)
    ) {
      projection = estimationDateObjectif(user.poidsHistorique, objectifNum);
    }

    // récupère suivis musculation user
    const suivis = await SuiviMusculation.find({ userId: user._id });

    // calcule records 1RM
    const records1RM: Record<string, { record: number | null; last: number | null }> = {};
    main1RMExercises.forEach(nom => {
      records1RM[nom] = {
        record: recordAbsolu1RM(suivis, nom),
        last: dernier1RM(suivis, nom)
      };
    });

    await user.save(); // sauvegarde user

    // construit objet user renvoyé
    const userObj = {
      _id: user._id,
      nom: user.nom,
      nomFamille: user.nomFamille,
      username: user.username,
      email: user.email,
      poids: user.poids,
      taille: user.taille,
      sexe: user.sexe,
      dispo: user.dispo,
      objectif: user.objectif,
      poidsObjectif: user.poidsObjectif,
      experience: user.experience,
      entrainement: user.entrainement,
      frequence: user.frequence,
      age: user.age,
      niveauActivite: user.niveauActivite,
      calories: user.calories,
      proteines: user.proteines,
      lipides: user.lipides,
      glucides: user.glucides,
      imc: user.imc,
      poidsHistorique: user.poidsHistorique || [],
      dateEstimeeObjectif: projection?.dateEstimee ?? null,
      pentePoids: projection?.details?.a ?? null,
      nbJoursRestant: projection?.details?.xObjectif ?? null,
      records1RM 
    };

    res.json({
      message: `Champ '${field}' mis à jour.`,
      user: userObj
    });
  } catch (error) {
    console.error('Erreur dans updateUserField:', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
