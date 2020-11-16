import { Router } from 'express';
import categoryRoutes from './category.routes';
import userRouter from './user.routes';
import sessionsRouter from './sessions.routes';
import productsRoutes from './products.routes';
import orderRoutes from './order.routes';

const routes = Router();

routes.use('/category', categoryRoutes);
routes.use('/user', userRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/products', productsRoutes);
routes.use('/orders', orderRoutes);

export default routes;
