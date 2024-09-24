import { Request, Response } from 'express';
import { RacingBetService } from '../services/RacingBetService';

export class RacingBetController {
  private racingBetService: RacingBetService;

  constructor() {
    this.racingBetService = new RacingBetService();
  }

  // Criar uma nova aposta
  async create(req: Request, res: Response): Promise<Response> {
    const { racingId, userId } = req.body;

    if (!racingId || !userId) {
      return res
        .status(400)
        .json({ message: 'ID da corrida e ID do usuário são obrigatórios' });
    }

    try {
      const newRacingBet = await this.racingBetService.create(racingId, userId);
      return res.status(201).json(newRacingBet);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao criar aposta',
        error: (error as Error).message,
      });
    }
  }

  // Listar todas as apostas
  async getAll(res: Response): Promise<Response> {
    try {
      const racingBets = await this.racingBetService.getAll();
      return res.json(racingBets);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar apostas',
        error: (error as Error).message,
      });
    }
  }

  // Buscar uma aposta por ID
  async getById(req: Request, res: Response): Promise<Response> {
    const id_racing_bet = parseInt(req.params.id_racing_bet!, 10);

    if (isNaN(id_racing_bet)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    try {
      const racingBet = await this.racingBetService.getById(id_racing_bet);
      if (!racingBet) {
        return res.status(404).json({ message: 'Aposta não encontrada' });
      }
      return res.json(racingBet);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar aposta',
        error: (error as Error).message,
      });
    }
  }

  // Atualizar uma aposta
  async update(req: Request, res: Response): Promise<Response> {
    const id_racing_bet = parseInt(req.params.id_racing_bet!, 10);
    const { racingId, userId } = req.body;

    if (isNaN(id_racing_bet) || !racingId || !userId) {
      return res
        .status(400)
        .json({ message: 'ID inválido ou dados incompletos' });
    }

    try {
      const updatedRacingBet = await this.racingBetService.update(
        id_racing_bet,
        racingId,
        userId
      );
      return res.json(updatedRacingBet);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao atualizar aposta',
        error: (error as Error).message,
      });
    }
  }

  // Deletar uma aposta
  async delete(req: Request, res: Response): Promise<Response> {
    const id_racing_bet = parseInt(req.params.id_racing_bet!, 10);

    if (isNaN(id_racing_bet)) {
      return res.status(400).json({ message: 'ID inválido' });
    }

    try {
      await this.racingBetService.delete(id_racing_bet);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao deletar aposta',
        error: (error as Error).message,
      });
    }
  }
}
