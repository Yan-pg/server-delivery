import { getRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Products from '../models/Products';

interface Request {
  product_id: string;
}

class FindProductsByIdService {
  public async excute({ product_id }: Request): Promise<Products[]> {
    const findProductsRepository = getRepository(Products);

    const findProducts = await findProductsRepository.find({
      where: { product_id },
    });

    if (!findProducts) {
      throw new AppError('Tehre are no products with this category');
    }

    return findProducts;
  }
}

export default FindProductsByIdService;
