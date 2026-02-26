import { betterAuth, boolean } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
// If your Prisma file is located elsewhere, you can change the path
import { prisma } from './prisma.js';
import { UserStatus } from '../types/index.js';

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql', // or "mysql", "postgresql", ...etc
  }),
  trustedOrigins: [process.env.APP_URL as string],
  // session: {
  //   cookieCache: {
  //     enabled: true,
  //     maxAge: 5 * 60 * 60 * 1000, // 5 minutes
  //   },
  //   expiresIn: 60 * 60 * 24 * 7, // 7 days - PERSISTENT LOGIN
  //   updateAge: 60 * 60 * 24, // Update every 24 hours
  // },

  // advanced: {
  //   cookiePrefix: 'better-auth',
  //   useSecureCookies: true,
  //   crossSubDomainCookies: {
  //     enabled: false,
  //   },
  //   defaultCookieAttributes: {
  //     sameSite: 'none',
  //     secure: true,
  //     httpOnly: true,
  //     path: '/',
  //     maxAge: 60 * 60 * 24 * 7, // 7 days
  //   },
  // },

  // csrf: {
  //   enabled: true,
  //   trustedOrigins: process.env.APP_URL,
  // },
  baseURL: process.env.BETTER_AUTH_URL,

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
