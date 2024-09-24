import { Router } from 'express';
import { RacingController } from '../controllers/RacingController';

const router = Router();
const racingController = new RacingController();

// Rota para criar uma nova corrida
router.post('/racing', racingController.create.bind(racingController));

// Rota para listar todas as corridas
router.get('/racing', racingController.getAll.bind(racingController));

// Rota para obter uma corrida por ID
router.get(
  '/racing/:id_racing',
  racingController.getById.bind(racingController)
);

// Rota para atualizar uma corrida por ID
router.put(
  '/racing/:id_racing',
  racingController.update.bind(racingController)
);

// Rota para deletar uma corrida por ID
router.delete(
  '/racing/:id_racing',
  racingController.delete.bind(racingController)
);

export default router;
