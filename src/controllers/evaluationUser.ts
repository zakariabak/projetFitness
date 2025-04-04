import { Request, Response } from 'express';
import User from '../models/User';

export const evaluationUser = async (req: Request, res: Response): Promise<void> => {
    const userId = req.params.id;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(userId, updates, {
            new: true,
            runValidators: true
        });

        if (!updatedUser) {
            res.status(404).json({ error: 'Utilisateur non trouvé' });
            return;
        }

        res.status(200).json({
            message: 'Utilisateur mis à jour avec succès après évaluation',
            user: updatedUser
        });
    } catch (error) {
        console.error('Erreur dans evaluationUser:', error);
        res.status(500).json({ error: "Erreur serveur lors de la mise à jour de l'utilisateur" });
    }
};
