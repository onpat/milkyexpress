import express, { type Request, type Response, type Router } from 'express';
import { getAuth } from 'firebase-admin/auth';
import { checkAuth } from '../auth.ts';

const router: Router = express.Router();

// get user
router.get('/profile', checkAuth, (req: Request, res: Response): void => {

  
});

export default router;