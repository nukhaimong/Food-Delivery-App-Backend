import { betterAuth, boolean } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from './prisma.js';
import { UserStatus } from '../types/index.js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: ['https://food-delivery-app-frontend-umber.vercel.app'],
  cookies: {
    secure: true,
    sameSite: 'none',
    httpOnly: true,
  },
  baseURL: 'https://food-delivery-app-backend-58qb.onrender.com/api/auth',

  user: {
    additionalFields: {
      user_role: {
        type: 'string',
        defaultValue: 'USER',
        required: true,
      },
      status: {
        type: 'string',
        defaultValue: UserStatus.active,
        enum: [UserStatus.active, UserStatus.suspended],
        required: true,
      },
    },
  },
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
});
