import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import upuloadConfig from '../config/upload';
import Products from '../models/Products';
import AppError from '../errors/AppError';

interface Request {
  products_id: string;
  ImageProducts: string;
}

class UpdateProductsImageService {
  public async execute({
    products_id,
    ImageProducts,
  }: Request): Promise<Products> {
    const productsRepository = getRepository(Products);

    const products = await productsRepository.findOne(products_id);

    if (!products) {
      throw new AppError('You need pass a products');
    }

    if (products.productImage) {
      const productsImageFilePath = path.join(
        upuloadConfig.directory,
        products.productImage,
      );

      const productsImageExists = await fs.promises.stat(productsImageFilePath);

      if (productsImageExists) {
        await fs.promises.unlink(productsImageFilePath);
      }
    }

    products.productImage = ImageProducts;

    await productsRepository.save(products);

    return products;
  }
}

export default UpdateProductsImageService;
