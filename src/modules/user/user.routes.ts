import express from 'express';
import auth from '../../middleware/auth.middleware';
import { UserRole } from '../../types';
import { userController } from './user.controller';

const router = express.Router();

router.get('/', auth(UserRole.admin), userController.getAllUsers);

router.get(
  '/:userId',
  auth(UserRole.admin, UserRole.provider),
  userController.getUserById,
);

router.put(
  '/update',
  auth(UserRole.user, UserRole.provider, UserRole.admin),
  userController.updatedUser,
);

router.put(
  '/activation/:userId',
  auth(UserRole.admin),
  userController.suspendOrActivateUser,
);

router.delete(
  '/delete',
  auth(UserRole.admin, UserRole.provider, UserRole.user),
  userController.deleteUser,
);

export const userRoutes = router;
