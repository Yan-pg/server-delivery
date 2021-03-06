import { getCustomRepository } from 'typeorm';
import AppError from '../errors/AppError';
import Category from '../models/Category';
import CategoryRepository from '../repositories/CategoriesRepository';

interface Request {
  name: string;
}

class CreateCategoryService {
  public async excute({ name }: Request): Promise<Category> {
    const categoryRepository = getCustomRepository(CategoryRepository);

    const findNameCategory = await categoryRepository.findByName(name);

    if (findNameCategory) {
      throw new AppError('Category name is already being used');
    }

    const category = categoryRepository.create({ name });

    await categoryRepository.save(category);

    return category;
  }
}

export default CreateCategoryService;
