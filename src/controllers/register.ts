import { Request, Response, NextFunction } from 'express';
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
};


/*import { NextFunction, Request, Response } from 'express';

interface IUser {
  email: string;
  motDePasse: string;
}

export const register = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);
  const user = req.body as IUser;
  console.log(user.email, user.motDePasse);

  res.status(200).json({
    reponse: "ok"
  });
}; */
