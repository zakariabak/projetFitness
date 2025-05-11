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
<<<<<<< HEAD
import { updateUserField } from '../controllers/changerAttributUser';

=======
import { getAllExercices } from '../controllers/getAllExercices';
import { getProgressionParExercice } from '../controllers/getProgressionParExercice';
import { modifierEntrainement } from '../controllers/modifierEntrainement';
import { genererEntrainementIA } from '../controllers/genererEntrainementIA';
>>>>>>> 4b39da8bba19da34500fd3e778e77704ec78563d
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/evaluation/:id', evaluationUser);
router.post('/suivi', authenticateToken, enregistrerSuivi);


router.get('/all', getAllUsers);
router.get('/suivi', authenticateToken, getSuivisUser);
router.get('/exercices', getAllExercices); 
router.delete('/suivi/:id', authenticateToken, deleteSuivi);
<<<<<<< HEAD
router.put('/suivi/modifier', authenticateToken, updateUserField);


=======
router.post('/generer-entrainement',authenticateToken, genererEntrainementIA);
>>>>>>> 4b39da8bba19da34500fd3e778e77704ec78563d

// Routes protégées par token
router.post('/entrainement', authenticateToken, creerEntrainement);
router.get('/entrainement', authenticateToken, getEntrainementUser);
router.put('/entrainement/:id', authenticateToken, modifierEntrainement);
router.delete('/entrainement/:id', authenticateToken, deleteEntrainement);
router.get('/suivi/performance/:nomExercice', authenticateToken, getProgressionParExercice);


export default router;

