import express from 'express';
import auth from '../../middleware/auth.middleware';
import { UserRole } from '../../types';
import { providerProfileController } from './providerProfile.controller';

const router = express.Router();

router.get('/', providerProfileController.getAllProviderProfile);

router.get(
  '/me',
  auth(UserRole.provider),
  providerProfileController.getProviderOwnProfile,
);

router.get(
  '/:providerId',
  auth(UserRole.provider, UserRole.user, UserRole.admin),
  providerProfileController.getProviderById,
);

router.put(
  '/update',
  auth(UserRole.provider),
  providerProfileController.updateProviderProfile,
);

router.post(
  '/post',
  auth(UserRole.provider),
  providerProfileController.createProviderProfile,
);

export const providerProfileRoutes = router;
