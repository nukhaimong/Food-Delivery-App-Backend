import express from 'express';
import auth from '../../middleware/auth.middleware.js';
import { UserRole } from '../../types/index.js';
import { mealsController } from './meals.controller.js';

const router = express.Router();

router.get('/', mealsController.getMeals);

router.get('/:mealId', mealsController.getMealById);

router.get('/category/:categoryId', mealsController.getMealsByCategory);

router.get('/provider/:providerId', mealsController.getMealsByProvider);

router.put(
  '/:mealId/update',
  auth(UserRole.provider),
  mealsController.updateMeal,
);

router.post('/', auth(UserRole.provider), mealsController.createMeal);

router.delete(
  '/:mealId/delete',
  auth(UserRole.provider),
  mealsController.deleteMeal,
);

export const mealsRoutes = router;
