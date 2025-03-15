import express from 'express';
import { register } from '../controllers/register';
import { login } from '../controllers/login';
import { getAllUsers } from '../controllers/getAllUsers';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/all', getAllUsers);

export default router;
