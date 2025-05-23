import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { estimationDateObjectif } from '../models/utilitaires/calculs';

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { email, motDePasse } = req.body;

  if (!email || !motDePasse) {
    // vérifie que email et mot de passe sont fournis
    res.status(400).json({ message: 'Email et mot de passe sont requis' });
    return;
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // utilisateur existe ?
      res.status(404).json({ message: 'Utilisateur non trouvé' });
      return;
    }
    if (user.motDePasse !== motDePasse) {
      // mot de passe correct ?
      res.status(401).json({ message: 'Mot de passe incorrect' });
      return;
    }

    // création du token JWT valide 24h
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    // calcul projection date objectif si données dispo
    let projection = null;
    if (user.poidsHistorique && user.poidsObjectif) {
      projection = estimationDateObjectif(
        user.poidsHistorique,
        Number(user.poidsObjectif)
      );
    }

    // prépare objet user renvoyé côté client
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

      dateEstimeeObjectif: projection?.dateEstimee || null,
      pentePoids: projection?.details?.a ?? null,
      nbJoursRestant: projection?.details?.xObjectif ?? null
    };

    console.log("TOKEN DEV :", token);

    res.status(200).json({
      message: 'Connexion réussie',
      token,
      user: userObj
    });

  } catch (error) {
    console.error('Erreur lors de la connexion :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la connexion.' });
  }
};
