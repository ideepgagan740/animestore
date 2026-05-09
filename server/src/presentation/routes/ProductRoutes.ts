import { Router } from 'express';
import { container } from '../../shared/container';
import { ProductController } from '../controllers/ProductController';
import { authMiddleware } from '../middlewares/AuthMiddleware';
import { adminOnly } from '../middlewares/RoleMiddleware';

const router = Router();
const productController = container.get<ProductController>(ProductController);

router.get('/', productController.getAll.bind(productController));
router.get('/:id', productController.getById.bind(productController));
router.post('/', authMiddleware, adminOnly, productController.create.bind(productController));

export default router;