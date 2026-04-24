import { NextFunction, Request, Response } from 'express';
import { UserRole, UserStatus } from '../types/index.js';
import { prisma } from '../lib/prisma.js';

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // const session = await betterAuth.api.getSession({
      //   headers: req.headers as any,
      // });
      // if (!session || !session.user) {
      //   return res.status(401).json({
      //     success: false,
      //     message: 'You are not authenticated',
      //   });
      // }

      const authHeader = req.headers.authorization;
      let sessionToken;

      if (authHeader && authHeader.startsWith('Bearer ')) {
        sessionToken = authHeader.split(' ')[1];
      }
      if (!sessionToken) {
        return res.status(401).json({
          success: false,
          message: 'Unauthorized access. No token provided. Please login.',
        });
      }
      const isSessionExist = await prisma.session.findFirst({
        where: {
          token: sessionToken,
          expiresAt: {
            gt: new Date(),
          },
        },
        include: {
          user: true,
        },
      });

      if (!isSessionExist) {
        return res.status(401).json({
          success: false,
          message: 'Session expired or invalid. Please login again.',
        });
      }

      const user = isSessionExist.user;

      req.user = {
        id: user.id,
        name: user.name,
        email: user.email,
        user_role: user.user_role as UserRole,
        image: user.image || undefined,
        status: user.status as UserStatus,
      };

      if (roles.length && !roles.includes(req.user.user_role)) {
        return res.status(403).json({
          success: false,
          message: "Forbiden! You're not authorized",
        });
      }

      next();
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  };
};

export default auth;
