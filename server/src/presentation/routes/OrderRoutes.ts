import { Router } from 'express';
import { container } from '../../shared/container';
import { OrderController } from '../controllers/OrderController';
import { authMiddleware } from '../middlewares/AuthMiddleware';

const router = Router();
const orderController = container.get<OrderController>(OrderController);

router.post('/', authMiddleware, orderController.create.bind(orderController));
router.get('/', authMiddleware, orderController.getUserOrders.bind(orderController));

export default router;