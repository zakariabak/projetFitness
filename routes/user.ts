import express, { NextFunction, Request, Response } from 'express';
import { register, login} from '../controllers/user';

const router = express.Router();

router.post('/register', register);
router.post('/login', login)


export = router;