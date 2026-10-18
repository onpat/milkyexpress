import express, { type Express, type Request, type Response} from 'express';
import {initializeApp, cert} from 'firebase-admin/app';
import cookieParser from 'cookie-parser';

import authRoute from './routes/authRoute.ts';
import userRoute from './routes/userRoute.ts';

const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccount) {
  throw new Error("missing service account json env");
}

initializeApp({
  credential: cert(JSON.parse(serviceAccount))
});

const app: Express = express();

app.use(express.json());
app.use(cookieParser());

app.use('/', authRoute);
app.use('/', userRoute);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.listen(3000);