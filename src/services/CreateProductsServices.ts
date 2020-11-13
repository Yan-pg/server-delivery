import { getRepository } from 'typeorm';
import Products from '../models/Products';

interface Request {
  product_id: string;
  name: string;
  price: number;
  description: string;
}

class CreateProductsService {
  public async excute({
    product_id,
    name,
    price,
    description,
  }: Request): Promise<Products> {
    const productsRepository = getRepository(Products);

    const findNameProducts = await productsRepository.findOne({
      where: { name },
    });

    if (findNameProducts) {
      throw Error('Products name is already being used');
    }

    const products = productsRepository.create({
      product_id,
      name,
      price,
      description,
    });

    await productsRepository.save(products);

    return products;
  }
}

export default CreateProductsService;
