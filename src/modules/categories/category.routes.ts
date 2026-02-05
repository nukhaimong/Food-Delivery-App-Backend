import express from 'express';
import auth from '../../middleware/auth.middleware';
import { UserRole } from '../../types';
import { categoryController } from './category.controller';

const router = express.Router();

router.get('/', categoryController.getAllCategories);

router.get('/:categoryId', categoryController.getCategoryById);

router.put(
  '/:categoryId',
  auth(UserRole.admin),
  categoryController.updateCategory,
);

router.delete(
  '/:categoryId',
  auth(UserRole.admin),
  categoryController.deleteCategory,
);

router.post('/post', auth(UserRole.admin), categoryController.createCategory);

export const categoryRoutes = router;
