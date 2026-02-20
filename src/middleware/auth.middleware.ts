import { NextFunction, Request, Response } from 'express';
import { UserRole, UserStatus } from '../types/index.js';
import { auth as betterAuth } from '../lib/auth.js';

const auth = (...roles: UserRole[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const session = await betterAuth.api.getSession({
        headers: req.headers as any,
      });
      if (!session || !session.user) {
        return res.status(401).json({
          success: false,
          message: 'You are not authenticated',
        });
      }

      req.user = {
        id: session.user.id,
        name: session.user.name,
        email: session.user.email,
        user_role: session.user.user_role as UserRole,
        image: session.user.image || undefined,
        status: session.user.status as UserStatus,
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
