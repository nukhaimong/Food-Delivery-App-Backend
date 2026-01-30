import { Order } from '../../../generated/prisma/client';
import { prisma } from '../../lib/prisma';
import { OrderData, OrderStatus } from '../../types';

const createOrder = async (customer_id: string, data: Order) => {
  if (!data.delivery_address?.trim() || !data.phone_number?.trim()) {
    throw new Error('You must provide all required information');
  }

  if (data.total_price == null) {
    data.total_price = 0;
  }

  const order = await prisma.order.create({
    data: {
      ...data,
      customer_id,
    },
    include: {
      customer: {
        select: { name: true, image: true },
      },
      orderItems: {
        include: {
          meal: {
            select: {
              provider: { select: { name: true, image: true } },
              category: { select: { category_name: true } },
              meal_name: true,
              image_url: true,
              description: true,
              price: true,
            },
          },
        },
      },
    },
  });
  return order;
};

const getOrders = async () => {
  return await prisma.order.findMany();
};

const getOrderById = async (order_id: string) => {
  return await prisma.order.findUnique({
    where: { order_id },
    include: {
      customer: {
        select: { name: true, image: true },
      },
      orderItems: {
        include: {
          meal: {
            select: {
              provider: { select: { name: true, image: true } },
              category: { select: { category_name: true } },
              meal_name: true,
              image_url: true,
              description: true,
              price: true,
            },
          },
        },
      },
    },
  });
};

const getOrderByCustomerId = async (customer_id: string) => {
  return await prisma.order.findMany({
    where: { customer_id },
    include: {
      customer: {
        select: { name: true, image: true },
      },
      orderItems: {
        include: {
          meal: {
            select: {
              provider: { select: { name: true, image: true } },
              category: { select: { category_name: true } },
              meal_name: true,
              image_url: true,
              description: true,
              price: true,
            },
          },
        },
      },
    },
  });
};

const updateOrderStatus = async (
  order_id: string,
  order_status: OrderStatus,
) => {
  if (!order_id) {
    throw new Error('The Order in not found');
  }
  const updateOrder = await prisma.order.update({
    where: { order_id },
    data: {
      order_status,
    },
  });
  return updateOrder;
};

const deleteOrder = async (order_id: string) => {
  return await prisma.order.delete({
    where: { order_id },
  });
};

export const orderService = {
  createOrder,
  getOrders,
  getOrderById,
  getOrderByCustomerId,
  updateOrderStatus,
  deleteOrder,
};
