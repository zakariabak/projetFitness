import express from 'express';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { getAllUsers } from '../controllers/getAllUsers';
import { evaluationUser } from '../controllers/evaluationUser';
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/evaluation/:id', evaluationUser);
router.get('/all', getAllUsers);

export default router;
