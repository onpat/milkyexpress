import express, { type Request, type Response, type Router } from 'express';
import { getAuth } from 'firebase-admin/auth';

const router: Router = express.Router();

// login json type
interface LoginRequestBody {
  idToken: string;
}

// login
router.post('/login', (req: Request, res: Response): void => {
  const { idToken } = req.body as LoginRequestBody;

  // get idToken from requested body.
  getAuth()
    .verifyIdToken(idToken)
    .then((decodedToken) => {
    const uid = decodedToken.uid;
    // set uid to cookie and use it onward ...
  })
  .catch((error) => {
    console.error('auth error:', error);
    res.status(401).json({ message: 'Unauthorized' });
  });
  console.log('auth ok');
  res.status(200).json({ message: 'login' });
  
});

export default router;