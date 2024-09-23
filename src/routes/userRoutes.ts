import { Router } from 'express';
import { UserController } from '../controllers/userController';

const router = Router();
const userController = new UserController();

router.post('/user/register', userController.register.bind(userController));
router.post('/user/login', userController.login.bind(userController));
router.get('/user/:id', userController.getUser.bind(userController));
router.get(
  '/user/points',
  userController.getUsersByPoints.bind(userController)
);
router.put('/user/:id', userController.updateUser.bind(userController));
router.delete('/user/:id', userController.deactivateUser.bind(userController));

export default router;
