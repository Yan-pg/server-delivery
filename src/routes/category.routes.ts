import { Router } from 'express';
import multer from 'multer';
import { getCustomRepository } from 'typeorm';
import { classToClass } from 'class-transformer';
import uploadConfig from '../config/upload';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

import CategoryRepository from '../repositories/CategoriesRepository';
import CreateCategoryService from '../services/CreateCategoryService';
import UpdateCategoryImageService from '../services/UpdateCategoryImageService';

const categoryRoutes = Router();
const upload = multer(uploadConfig);

categoryRoutes.use(ensureAuthenticated);

categoryRoutes.get('/', async (request, response) => {
  const categoryRepository = getCustomRepository(CategoryRepository);
  const category = await categoryRepository.find();

  return response.json({ category: classToClass(category) });
});

categoryRoutes.post('/create', async (request, response) => {
  const { name } = request.body;

  const createCategory = new CreateCategoryService();

  const category = await createCategory.excute({
    name,
  });

  return response.json(category);
});

categoryRoutes.patch(
  '/image/:id',
  upload.single('file'),
  async (request, response) => {
    const { id } = request.params;
    const { filename } = request.file;

    const updateCategoryImage = new UpdateCategoryImageService();

    const category = await updateCategoryImage.execute({
      category_id: id,
      ImageCategory: filename,
    });

    return response.json({ category: classToClass(category) });
  },
);

export default categoryRoutes;
