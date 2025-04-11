import express from 'express';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { getAllUsers } from '../controllers/getAllUsers';
import { evaluationUser } from '../controllers/evaluationUser';
import { creerEntrainement } from '../controllers/creerEntrainement';
import { getEntrainementUser } from '../controllers/getEntrainementUser';
import { authenticateToken } from '../middlewares/authenticateToken';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/evaluation/:id', evaluationUser);
router.get('/all', getAllUsers);

// Routes protégées par token
router.post('/entrainement', authenticateToken, creerEntrainement);
router.get('/entrainement', authenticateToken, getEntrainementUser);

export default router;

/*import express from 'express';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { getAllUsers } from '../controllers/getAllUsers';
import { evaluationUser } from '../controllers/evaluationUser';
import { creerEntrainement } from '../controllers/creerEntrainement';
import { getEntrainementUser } from '../controllers/getEntrainementUser';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/evaluation/:id', evaluationUser);
router.get('/all', getAllUsers);

router.post('/entrainement', creerEntrainement);
console.log('👀 Type de creerEntrainement :', typeof creerEntrainement);

router.get('/entrainement/:userId', getEntrainementUser);

export default router;
*/