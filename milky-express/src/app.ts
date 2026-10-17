import express, { type Express, type Request, type Response} from 'express';
import {initializeApp, cert} from 'firebase-admin/app';

import authRoute from './routes/authRoute.ts';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
  throw new Error("missing service account json env");
}

initializeApp({
  credential: cert(JSON.parse(serviceAccount))
});

const app: Express = express();

app.use('/', authRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000);