import express, { type Request, type Response, type Router } from 'express';
import { getAuth } from 'firebase-admin/auth';

const router: Router = express.Router();

// login
router.post('/login', (req: Request<{}, {}, unknown>, res: Response): void => {

  // idToken check
  const body = req.body;
  if (
    typeof body !== 'object' ||
    body === null ||
    Array.isArray(body) ||
    !('idToken' in body) ||
    typeof body.idToken !== 'string' ||
    body.idToken.trim().length === 0
  ) {
    res.status(400).json({ message: 'idToken must be a non-empty string' });
    return;
  }

  const { idToken } = body;

  // expire in 13 days
  const expiresIn = 60 * 60 * 24 * 13 * 1000;
  getAuth()
    .createSessionCookie(idToken, { expiresIn })
    .then(
      (sessionCookie) => {
        // Set cookie policy for session cookie.
        const options = { maxAge: expiresIn,
                          httpOnly: true,
                          secure: true, /* https only */
                          sameSite: 'lax' /* csrf protection (for new browser) */ };
        res.cookie('session', sessionCookie, options);
        res.json({ message: 'Login' });
        return;
      },
      (error) => {
        console.error('auth error:', error);
        res.status(401).json({ message: 'Unauthorized' });
        return;
      }
    );
});

export default router;
