import { Request, Response, NextFunction } from 'express';
import { users } from '../data/users';
import { IUser } from '../models/User';
import { v4 as uuidv4 } from 'uuid';

export const register = (req: Request, res: Response, next: NextFunction): void => {
    const { nom, nomFamille, username, email, motDePasse } = req.body;

    // Vérifie que tous les champs sont présents
    if (!nom || !nomFamille || !username || !email || !motDePasse) {
        res.status(400).json({
            message: 'Tous les champs sont requis : nom, nomFamille, username, email et motDePasse'
        });
        return;
    }

    // Vérifie si l'email ou le username existent déjà
    const existingUser = users.find(user => user.email === email || user.username === username);

    if (existingUser) {
        res.status(409).json({
            message: 'Cet email ou ce username est déjà enregistré'
        });
        return;
    }

    // Crée le nouvel utilisateur
    const newUser: IUser = {
        _id: uuidv4(), // On génère un ID unique
        nom,
        nomFamille,
        username,
        email,
        motDePasse, // En mémoire, sinon à hasher avec bcrypt en prod
        poids: null,
        taille: null,
        sexe: null,
        dispo: null
    };

    users.push(newUser);

    console.log('Nouvel utilisateur enregistré :', newUser);
    console.log('Liste actuelle des utilisateurs :', users);

    // Renvoie uniquement les infos utiles sans le mot de passe
    res.status(201).json({
        message: 'Utilisateur enregistré avec succès ✅',
        user: {
            _id: newUser._id,
            nom: newUser.nom,
            nomFamille: newUser.nomFamille,
            username: newUser.username,
            email: newUser.email
        }
    });
};
/*import { Request, Response, NextFunction } from 'express';
import { users } from '../data/users';

export const register = (req: Request, res: Response, next: NextFunction): void => {
  const { email, motDePasse } = req.body;

  if (!email || !motDePasse) {
    res.status(400).json({
      message: 'Email et mot de passe sont requis'
    });
    return;
  }

  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    res.status(409).json({
      message: 'Cet email est déjà enregistré'
    });
    return;
  }

  const newUser = { email, motDePasse };
  users.push(newUser);

  console.log('Nouvel utilisateur enregistré :', newUser);
  console.log('Liste actuelle des utilisateurs :', users);

  res.status(201).json({
    message: 'Utilisateur enregistré avec succès ✅',
    user: { email: newUser.email }
  });
}; */


