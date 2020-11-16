import { classToClass } from 'class-transformer';
import { Router } from 'express';
import CreateUserService from '../services/CreateUserService';

const userRouter = Router();

userRouter.post('/', async (request, response) => {
  const {
    name,
    email,
    password,
    neighborhood,
    houseNumber,
    street,
  } = request.body;

  const createUser = new CreateUserService();

  const user = await createUser.excute({
    name,
    email,
    password,
    neighborhood,
    houseNumber,
    street,
  });

  return response.json({ user: classToClass(user) });
});

export default userRouter;
