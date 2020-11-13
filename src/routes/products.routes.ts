import { Router } from 'express';
import { getRepository } from 'typeorm';
import Products from '../models/Products';
// import {} from 'typeorm';
import CreateProductsServices from '../services/CreateProductsServices';

const productsRoutes = Router();

productsRoutes.get('/', async (request, response) => {
  const productRepository = getRepository(Products);
  const product = await productRepository.find();

  return response.json(product);
});

productsRoutes.post('/create', async (request, response) => {
  try {
    const { product_id, name, price, description } = request.body;

    const createProducts = new CreateProductsServices();

    const products = await createProducts.excute({
      product_id,
      name,
      price,
      description,
    });

    return response.json(products);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default productsRoutes;
