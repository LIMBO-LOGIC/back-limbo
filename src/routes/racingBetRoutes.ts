import { Router } from 'express';
import { RacingBetController } from '../controllers/RacingBetController';

const router = Router();
const racingBetController = new RacingBetController();

router.post(
  '/racing-bets',
  racingBetController.create.bind(racingBetController)
);
router.get(
  '/racing-bets',
  racingBetController.getAll.bind(racingBetController)
);
router.get(
  '/racing-bets/:id_racing_bet',
  racingBetController.getById.bind(racingBetController)
);
router.put(
  '/racing-bets/:id_racing_bet',
  racingBetController.update.bind(racingBetController)
);
router.delete(
  '/racing-bets/:id_racing_bet',
  racingBetController.delete.bind(racingBetController)
);

export default router;
