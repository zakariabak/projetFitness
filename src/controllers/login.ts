import { Request, Response, NextFunction } from 'express';
import User from '../models/User'; 

export const login = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { email, motDePasse } = req.body;

    console.log('Données reçues dans /login :', req.body);

    
    if (!email || !motDePasse) {
        res.status(400).json({
            message: 'Email et mot de passe sont requis'
        });
        return;
    }

    try {
        const user = await User.findOne({ email });

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

        console.log(`✅ Utilisateur connecté : ${user.username}`);

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

