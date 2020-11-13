import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';
import uploadConfig from '../config/upload';

import CategoryRepository from '../repositories/CategoriesRepository';
import CreateCategoryService from '../services/CreateCategoryService';
import UpdateCategoryImageService from '../services/UpdateCategoryImageService';

const categoryRoutes = Router();
const upload = multer(uploadConfig);

categoryRoutes.get('/', async (request, response) => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const category = await categoryRepository.find();

  return response.json(category);
});

categoryRoutes.post('/create', async (request, response) => {
  try {
    const { name } = request.body;

    const createCategory = new CreateCategoryService();

    const category = await createCategory.excute({
      name,
    });

    return response.json(category);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

categoryRoutes.patch(
  '/image/:id',
  upload.single('file'),
  async (request, response) => {
    try {
      const { id } = request.params;
      const { filename } = request.file;

      const updateCategoryImage = new UpdateCategoryImageService();

      const category = await updateCategoryImage.execute({
        catogory_id: id,
        ImageCategory: filename,
      });

      return response.json(category);
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  },
);

export default categoryRoutes;
