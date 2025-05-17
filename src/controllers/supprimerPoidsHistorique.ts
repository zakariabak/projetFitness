import { Request, Response } from 'express';
import User from '../models/User';
import { IUser } from '../common/IUser';
import { calculCalories, calculIMC, calculMacros, estimationDateObjectif } from '../models/utilitaires/calculs';

interface AuthRequest extends Request {
  user?: { id: string };
}

export const supprimerPoidsHistorique = async (req: AuthRequest, res: Response): Promise<void> => {
  const poidsId = req.params.id;

  try {
    const user = await User.findById(req.user?.id) as IUser;
    if (!user) {
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }

    if (!user.poidsHistorique) {
      res.status(400).json({ message: 'Aucun historique de poids à supprimer' });
      return;
    }

    user.poidsHistorique = user.poidsHistorique.filter(p => p._id?.toString() !== poidsId);

   
    if (user.poidsHistorique.length > 0) {
      const derniere = user.poidsHistorique.reduce((a, b) =>
        new Date(a.date) > new Date(b.date) ? a : b
      );
      user.poids = derniere.poids;
    } else {
      user.poids = null;
    }

   
    let calories = null, imc = null, proteines = null, lipides = null, glucides = null;
    if (user.poids && user.taille && user.age && user.sexe && user.niveauActivite && user.objectif) {
      calories = calculCalories(user.poids, user.taille, user.age, user.sexe, user.niveauActivite, user.objectif);
      imc = calculIMC(user.poids, user.taille);
      ({ proteines, lipides, glucides } = calculMacros(user.poids, calories));
      user.calories = calories;
      user.imc = imc;
      user.proteines = proteines;
      user.lipides = lipides;
      user.glucides = glucides;
    }

    let projection = null;
    const objectifNum = Number(user.poidsObjectif);
    if (user.poidsHistorique.length >= 2 && !isNaN(objectifNum)) {
      projection = estimationDateObjectif(user.poidsHistorique, objectifNum);
    }
const userObj = {
  ...user.toObject(),
  dateEstimeeObjectif: projection?.dateEstimee ?? null,
  pentePoids: projection?.details?.a ?? null,
  nbJoursRestant: projection?.details?.xObjectif ?? null
};
    await user.save();

    res.json({
      message: 'Poids supprimé',
      user: userObj
    });
  } catch (error) {
    console.error('Erreur suppression poids :', error);
    res.status(500).json({ message: 'Erreur serveur', error });
  }
};
