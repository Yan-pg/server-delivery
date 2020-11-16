import { classToClass } from 'class-transformer';
import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository, getRepository } from 'typeorm';
import uploadConfig from '../config/upload';
import Products from '../models/Products';
import CreateProductsServices from '../services/CreateProductsServices';
import FindProductsByIdService from '../services/FindProductsByIdService';
import UpdateProductImageService from '../services/UpdateProductImageService';

const productsRoutes = Router();

const upload = multer(uploadConfig);

productsRoutes.get('/', async (request, response) => {
  const productsRepository = getRepository(Products);
  const products = await productsRepository.find();

  return response.json({ category: classToClass(products) });
});

productsRoutes.get('/list/:product_id', async (request, response) => {
  const { product_id } = request.params;

  const findProductsbyId = new FindProductsByIdService();

  const products = await findProductsbyId.excute({ product_id });

  console.log(products);

  return response.json(products);
});

productsRoutes.post('/create', async (request, response) => {
  const { product_id, name, price, description } = request.body;

  const createProducts = new CreateProductsServices();

  const products = await createProducts.excute({
    product_id,
    name,
    price,
    description,
  });

  return response.json(products);
});

productsRoutes.patch(
  '/image/:id',
  upload.single('file'),
  async (request, response) => {
    const { id } = request.params;
    const { filename } = request.file;

    const updateProductsImage = new UpdateProductImageService();

    const product = await updateProductsImage.execute({
      products_id: id,
      ImageProducts: filename,
    });

    return response.json({ product: classToClass(product) });
  },
);

export default productsRoutes;
