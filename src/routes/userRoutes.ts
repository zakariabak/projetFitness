import express from 'express';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { getAllUsers } from '../controllers/getAllUsers';
import { evaluationUser } from '../controllers/evaluationUser';
import { creerEntrainement } from '../controllers/creerEntrainement';
import { getEntrainementUser } from '../controllers/getEntrainementUser';
import { deleteEntrainement } from '../controllers/deleteEntrainement';
import { authenticateToken } from '../middlewares/authenticateToken';
import { enregistrerSuivi } from '../controllers/enregistrerSuivi';
import { getSuivisUser } from '../controllers/getSuivisUser';
import { deleteSuivi } from '../controllers/deleteSuivi';
import { updateUserField } from '../controllers/changerAttributUser';
import { supprimerPoidsHistorique } from '../controllers/supprimerPoidsHistorique';
import { getAllExercices } from '../controllers/getAllExercices';
import { getProgressionParExercice } from '../controllers/getProgressionParExercice';
import { modifierEntrainement } from '../controllers/modifierEntrainement';
import { getRecords1RM } from '../controllers/getRecords1RM';
import { genererEntrainementIA } from '../controllers/genererEntrainementIA';
import { creerRepas, getRepasUtilisateur, supprimerRepas } from '../controllers/repasController';
import { getJournee, upsertJournee, getJourneesDeSemaine } from '../controllers/journeeController';

const router = express.Router();

// Routes publiques (sans auth)
router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllUsers);
router.get('/exercices', getAllExercices);

// Routes nécessitant un token JWT valide (authentification)
router.use(authenticateToken);

// Gestion utilisateur
router.put('/evaluation/:id', evaluationUser);
router.put('/attribut', updateUserField);

// Gestion entraînements
router.post('/entrainement', creerEntrainement);
router.get('/entrainement', getEntrainementUser);
router.put('/entrainement/:id', modifierEntrainement);
router.delete('/entrainement/:id', deleteEntrainement);

// Gestion suivis musculation
router.post('/suivi', enregistrerSuivi);
router.get('/suivi', getSuivisUser);
router.delete('/suivi/:id', deleteSuivi);
router.get('/suivi/performance/:nomExercice', getProgressionParExercice);
router.put('/suivi/modifier', updateUserField);

// Records et IA
router.get('/records1RM', getRecords1RM);
router.post('/generer-entrainement', genererEntrainementIA);

// Gestion poids historique
router.delete('/poids-historique/:id', supprimerPoidsHistorique);

// Gestion repas personnalisés
router.post('/repas', creerRepas);
router.get('/repas', getRepasUtilisateur);
router.delete('/repas/:id', supprimerRepas);

// Gestion journées nutrition
router.get('/jour/:date', getJournee);
router.post('/jour', upsertJournee);
router.get('/journees/semaine/:annee/:semaine', getJourneesDeSemaine);

export default router;
