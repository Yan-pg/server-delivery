import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import Category from '../models/Category';

import upuloadConfig from '../config/upload';
import AppError from '../errors/AppError';

interface Request {
  category_id: string;
  ImageCategory: string;
}

class UpdateCategoryImageService {
  public async execute({
    category_id,
    ImageCategory,
  }: Request): Promise<Category> {
    const categoryRepository = getRepository(Category);

    const category = await categoryRepository.findOne(category_id);

    if (!category) {
      throw new AppError('You need pass a category');
    }

    if (category.categoryImage) {
      const categoryImageFilePath = path.join(
        upuloadConfig.directory,
        category.categoryImage,
      );

      const categoryImageExists = await fs.promises.stat(categoryImageFilePath);

      if (categoryImageExists) {
        await fs.promises.unlink(categoryImageFilePath);
      }
    }

    category.categoryImage = ImageCategory;

    await categoryRepository.save(category);

    return category;
  }
}

export default UpdateCategoryImageService;
