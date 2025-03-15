import { Request, Response, NextFunction } from 'express';
import { users } from '../data/users'; // ⚠️ importe ton tableau users

export const login = (req: Request, res: Response, next: NextFunction): void => {
  const { email, motDePasse } = req.body;

  console.log('Données reçues dans /login :', req.body);

  // Vérification des champs
  if (!email || !motDePasse) {
    res.status(400).json({
      message: 'Email ou mot de passe manquant !'
    });
    return;
  }

  // Recherche de l'utilisateur dans la "base"
  const user = users.find(u => u.email === email);

  if (!user) {
    res.status(404).json({
      message: 'Utilisateur non trouvé ❌'
    });
    return;
  }

  // Vérification du mot de passe
  if (user.motDePasse !== motDePasse) {
    res.status(401).json({
      message: 'Mot de passe incorrect ❌'
    });
    return;
  }

  // Tout est OK
  res.status(200).json({
    message: 'Connexion réussie ✅',
    user: {
      email: user.email
      // Tu peux ajouter d'autres champs si besoin, genre nom, etc.
    }
  });
};




/* import { NextFunction, Request, Response } from 'express';

export const login = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  res.status(200).json({
    message: 'Login OK'
  });
}; */
