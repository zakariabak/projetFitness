import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

export const register = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { nom, nomFamille, username, email, motDePasse } = req.body;

  if (!nom || !nomFamille || !username || !email || !motDePasse) {
    // vérifie que tous les champs sont fournis
    res.status(400).json({
      message: 'Tous les champs sont requis : nom, nomFamille, username, email et motDePasse'
    });
    return;
  }

  try {
    // vérifie si email ou username déjà utilisés
    const existingUser = await User.findOne({
      $or: [
        { email: email },
        { username: username }
      ]
    });

    if (existingUser) {
      res.status(409).json({
        message: 'Cet email ou ce username est déjà enregistré'
      });
      return;
    }

    // crée nouvel utilisateur avec champs de base
    const newUser = new User({
      nom,
      nomFamille,
      username,
      email,
      motDePasse,
      poids: null,
      taille: null,
      sexe: null,
      dispo: null
    });

    const savedUser = await newUser.save();

    console.log('Nouvel utilisateur enregistré :', savedUser);

    // renvoie données basiques sans mot de passe
    res.status(201).json({
      message: 'Utilisateur enregistré avec succès',
      user: {
        _id: savedUser._id,
        nom: savedUser.nom,
        nomFamille: savedUser.nomFamille,
        username: savedUser.username,
        email: savedUser.email
      }
    });

  } catch (error) {
    console.error('Erreur Register :', error);
    res.status(500).json({ message: 'Erreur serveur lors de l\'inscription.' });
  }
};
