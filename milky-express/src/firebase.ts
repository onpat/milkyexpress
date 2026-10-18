import admin from 'firebase-admin';
import {initializeApp, cert, getApps} from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
  throw new Error("missing service account json env");
}

if (getApps().length == 0) {
  initializeApp({
    credential: cert(JSON.parse(serviceAccount))
  });
}

// export firestore
export const db = getFirestore();
export const auth = getAuth();
