import express from 'express';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { getAllUsers } from '../controllers/getAllUsers';
import { evaluationUser } from '../controllers/evaluationUser';
import { creerEntrainement } from '../controllers/creerEntrainement';
import { getEntrainementUser } from '../controllers/getEntrainementUser';

const router = express.Router();

// 🔐 Utilisateurs
router.post('/register', register);
router.post('/login', login);
router.put('/evaluation/:id', evaluationUser);
router.get('/all', getAllUsers);

router.post('/entrainement', creerEntrainement);
console.log('👀 Type de creerEntrainement :', typeof creerEntrainement);

router.get('/entrainement/:userId', getEntrainementUser);
// 💪 Entraînements

export default router;
