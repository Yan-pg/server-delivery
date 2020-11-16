import { getRepository } from 'typeorm';
import Order from '../models/Orders';

interface Request {
  name: string;
  quantity: number;
  priceTotal: number;
  neighborhood: string;
  street: string;
  houseNumber: number;
}

class CreateOrdersService {
  public async excute({
    name,
    quantity,
    priceTotal,
    neighborhood,
    street,
    houseNumber,
  }: Request): Promise<Order> {
    const orderRepository = getRepository(Order);

    const order = orderRepository.create({
      name,
      quantity,
      priceTotal,
      street,
      neighborhood,
      houseNumber,
    });

    await orderRepository.save(order);

    return order;
  }
}

export default CreateOrdersService;
