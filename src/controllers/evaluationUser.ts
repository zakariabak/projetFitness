import { Request, Response } from 'express';
import User from '../models/User';
import { calculCalories, calculIMC, calculMacros } from '../models/utilitaires/calculs';

export const evaluationUser = async (req: Request, res: Response): Promise<void> => {
    console.log("PUT /evaluation/:id appelé !");
    console.log("Body reçu :", req.body);
    console.log("ID reçu :", req.params.id); const userId = req.params.id;
    const updates = req.body;

    const calories = calculCalories(
        updates.poids,
        updates.taille,
        updates.age,
        updates.sexe,
        updates.niveauActivite,
        updates.objectif
      );
      updates.calories = calories;

      const imc = calculIMC(updates.poids, updates.taille);
      const {proteines, lipides, glucides} = calculMacros(updates.poids,calories)

      updates.imc = imc;
updates.proteines = proteines;
updates.lipides = lipides;
updates.glucides = glucides;

    
     

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
            user: updatedUser, calories
        });
    } catch (error) {
        console.error('Erreur dans evaluationUser:', error);
        res.status(500).json({ error: "Erreur serveur lors de la mise à jour de l'utilisateur" });
    }
};
