import { Router } from 'express';
import categoryRoutes from './category.routes';
import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import productsRoutes from './products.routes';

const routes = Router();

routes.use('/category', categoryRoutes);
routes.use('/user', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRoutes);

export default routes;
