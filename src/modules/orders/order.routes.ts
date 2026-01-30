import express from 'express';
import { UserRole } from '../../types';
import auth from '../../middleware/auth.middleware';
import { orderController } from './order.controller';

const router = express.Router();

router.get('/', auth(UserRole.admin), orderController.getOrders);

router.get(
  '/:orderId',
  auth(UserRole.user, UserRole.provider, UserRole.admin),
  orderController.getOrdersById,
);

router.get(
  '/customer/:customerId',
  auth(UserRole.user, UserRole.provider, UserRole.admin),
  orderController.getOrderByCustomerId,
);

router.put(
  '/update/:orderId',
  auth(UserRole.user, UserRole.provider),
  orderController.updateOrderStatus,
);

router.delete(
  '/delete/:orderId',
  auth(UserRole.provider, UserRole.admin),
  orderController.deleteOrder,
);

router.post(
  '/place',
  auth(UserRole.user, UserRole.provider, UserRole.admin),
  orderController.createOrder,
);

export const orderRoutes = router;
