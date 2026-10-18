import express, { type Request, type Response, type NextFunction } from 'express';
import { type DecodedIdToken, getAuth } from 'firebase-admin/auth';

// cookie auth middleware
export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const sessionCookie = req.cookies?.session || '';

  getAuth()
    .verifySessionCookie(sessionCookie, true /** checkRevoked */)
    .then((decodedClaims) => {
      decodedClaims.uid
      // get profile by decoded claims (uid, ...)
      next();
    })
    .catch((error) => {
      // please login
      console.error('auth error:', error);
      res.status(401).json({ message: 'Unauthorized' });
      return;
    });
};