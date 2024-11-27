import { Router } from 'express';
import { UserController } from '../controllers/UserController';

const router = Router();
const userController = new UserController();

// Rotas de criação e autenticação
router.post('/user/register', userController.register.bind(userController));
router.post('/user/login', userController.login.bind(userController));

// Rotas de busca específicas e genéricas
router.get('/user/:id', userController.getUser.bind(userController));
router.get(
  '/users/points',
  userController.getUsersByPoints.bind(userController)
);
router.get('/users', userController.getAllUser.bind(userController));

// Rotas de atualização de dados do usuário
router.put('/user/:id', userController.updateUser.bind(userController));
router.put(
  '/user/:id/points',
  userController.updateUserPoints.bind(userController)
);
router.put(
  '/user/:id/password',
  userController.changePassword.bind(userController)
);

// Rotas de exclusão e desativação
router.delete('/user/:id', userController.deactivateUser.bind(userController));
router.delete(
  '/user/delete/:id',
  userController.deleteUser.bind(userController)
);

export default router;
