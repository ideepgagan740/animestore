import { Router } from 'express';
import { container } from '../../shared/container';
import { AuthController } from '../controllers/AuthController';
import { validateRequest } from '../middlewares/ValidationMiddleware';
import { registerSchema, loginSchema } from '../middlewares/AuthValidation';

const router = Router();
const authController = container.get<AuthController>(AuthController);

router.post('/register', validateRequest(registerSchema), authController.register.bind(authController));
router.post('/login', validateRequest(loginSchema), authController.login.bind(authController));

export default router;