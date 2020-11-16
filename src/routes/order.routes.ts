import { Router } from 'express';
import CreateOrdersService from '../services/CreateOrdersService';

const orderRoutes = Router();

orderRoutes.post('/', async (request, response) => {
  const {
    name,
    quantity,
    priceTotal,
    neighborhood,
    houseNumber,
    street,
  } = request.body;

  const createOrder = new CreateOrdersService();

  const order = await createOrder.excute({
    name,
    quantity,
    priceTotal,
    neighborhood,
    houseNumber,
    street,
  });

  return response.json(order);
});

export default orderRoutes;
