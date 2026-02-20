import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import { UserRole } from '../../types/index.js';
import { userController } from './user.controller.js';

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
