import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; // On utilise le modèle mongoose

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, motDePasse } = req.body;

    console.log('Données reçues dans /login :', req.body);

    // ➡️ Vérifie que tous les champs sont présents
    if (!email || !motDePasse) {
        res.status(400).json({
            message: 'Email et mot de passe sont requis'
        });
        return;
    }

    try {
        // ➡️ Recherche de l'utilisateur dans MongoDB
        const user = await User.findOne({ email });

        if (!user) {
            res.status(404).json({
                message: 'Utilisateur non trouvé ❌'
            });
            return;
        }

        // ➡️ Vérification du mot de passe (en clair pour l'instant)
        if (user.motDePasse !== motDePasse) {
            res.status(401).json({
                message: 'Mot de passe incorrect ❌'
            });
            return;
        }

        console.log(`✅ Utilisateur connecté : ${user.username}`);

        // ➡️ Renvoie toutes les infos utiles (sans le mot de passe)
        res.status(200).json({
            message: 'Connexion réussie ✅',
            user: {
                _id: user._id,
                nom: user.nom,
                nomFamille: user.nomFamille,
                username: user.username,
                email: user.email,
                poids: user.poids,
                taille: user.taille,
                sexe: user.sexe,
                dispo: user.dispo
            }
        });

    } catch (error) {
        console.error('❌ Erreur lors de la connexion :', error);
        res.status(500).json({
            message: 'Erreur serveur lors de la connexion.'
        });
    }
};

/*import { Request, Response, NextFunction } from 'express';
import { users } from '../data/users';

export const login = (req: Request, res: Response, next: NextFunction): void => {
    const { email, motDePasse } = req.body;

    console.log('Données reçues dans /login :', req.body);

    // Vérifie que tous les champs sont présents
    if (!email || !motDePasse) {
        res.status(400).json({
            message: 'Email et mot de passe sont requis'
        });
        return;
    }

    const user = users.find(u => u.email === email);

    if (!user) {
        res.status(404).json({
            message: 'Utilisateur non trouvé ❌'
        });
        return;
    }

    if (user.motDePasse !== motDePasse) {
        res.status(401).json({
            message: 'Mot de passe incorrect ❌'
        });
        return;
    }

    console.log('Utilisateur connecté avec succès ✅');

    // Renvoie toutes les infos utiles (sans le mot de passe)
    res.status(200).json({
        message: 'Connexion réussie ✅',
        user: {
            _id: user._id,
            nom: user.nom,
            nomFamille: user.nomFamille,
            username: user.username,
            email: user.email,
            poids: user.poids,
            taille: user.taille,
            sexe: user.sexe,
            dispo: user.dispo
        }
    });
}; */




/*import { Request, Response, NextFunction } from 'express';
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

*/

