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

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/evaluation/:id', evaluationUser);
router.post('/suivi', authenticateToken, enregistrerSuivi);


router.get('/all', getAllUsers);
router.get('/suivi', authenticateToken, getSuivisUser);
router.delete('/suivi/:id', authenticateToken, deleteSuivi);
router.put('/suivi/modifier', authenticateToken, updateUserField);



// Routes protégées par token
router.post('/entrainement', authenticateToken, creerEntrainement);
router.get('/entrainement', authenticateToken, getEntrainementUser);
router.delete('/entrainement/:id', authenticateToken, deleteEntrainement);


export default router;

