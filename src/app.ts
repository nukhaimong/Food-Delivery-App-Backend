import express, { Application, Request, request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth';
import { categoryRouter } from './modules/categories/category.routes';
import cors from 'cors';
import { providerProfileRoutes } from './modules/providerProfile/providerProfile.routes';

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL || 'http://localhost:3000',
  }),
);
app.all('/api/auth/{*any}', toNodeHandler(auth));
app.use('/category', categoryRouter);
app.use('/provider-profile', providerProfileRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Food Delivery App Backend is running!');
});

export default app;
