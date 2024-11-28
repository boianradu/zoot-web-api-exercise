import { Router } from 'express';
import { getUsers, createUser } from '../controllers/zoot.controller';

const router = Router();

router.get('/wallets', getUsers);

export default router;