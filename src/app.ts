import express, { Application, Request, Response } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './lib/auth.js';
import { categoryRoutes } from './modules/categories/category.routes.js';
import cors from 'cors';
import { providerProfileRoutes } from './modules/providerProfile/providerProfile.routes.js';
import { mealsRoutes } from './modules/meals/meals.routes.js';
import { orderRoutes } from './modules/orders/order.routes.js';
import { reviewsRoutes } from './modules/reviews/reviews.routes.js';
import { userRoutes } from './modules/user/user.routes.js';

const app: Application = express();
app.use(express.json());
app.use(
  cors({
    origin: process.env.APP_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    // allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    // exposedHeaders: ['set-cookie'],
  }),
);

// Configure CORS to allow both production and Vercel preview deployments
// const allowedOrigins = [
//   'https://food-delivery-app-frontend-umber.vercel.app',
// ].filter(Boolean); // Remove undefined values

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       // Allow requests with no origin (mobile apps, Postman, etc.)
//       if (!origin) return callback(null, true);

//       // Check if origin is in allowedOrigins or matches Vercel preview pattern
//       const isAllowed =
//         allowedOrigins.includes(origin) ||
//         /^https:\/\/.*\.vercel\.app$/.test(origin); // Any Vercel deployment

//       if (isAllowed) {
//         callback(null, true);
//       } else {
//         callback(new Error(`Origin ${origin} not allowed by CORS`));
//       }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
//     exposedHeaders: ['Set-Cookie'],
//   }),
// );

app.use('/api/auth', toNodeHandler(auth));
app.use('/category', categoryRoutes);
app.use('/provider-profile', providerProfileRoutes);
app.use('/meals', mealsRoutes);
app.use('/order', orderRoutes);
app.use('/reviews', reviewsRoutes);
app.use('/users', userRoutes);

app.get('/api/debug-cookies', (req, res) => {
  console.log('Cookies received:', req.headers.cookie);
  res.json({
    cookies: req.headers.cookie || 'No cookies',
    headers: req.headers,
  });
});

app.get('/', (req: Request, res: Response) => {
  res.send('Food Delivery App Backend is running!');
});

export default app;
