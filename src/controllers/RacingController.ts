import { Request, Response } from 'express';
import { RacingService } from '../services/RacingService';

export class RacingController {
  private racingService: RacingService;

  constructor() {
    this.racingService = new RacingService();
  }

  // POST: Criar uma nova corrida
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const racing = await this.racingService.create(req.body);
      return res.status(201).json(racing);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // GET: Listar todas as corridas
  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const races = await this.racingService.getAll();
      return res.status(200).json(races);
    } catch (error) {
      return res.status(500).json({ message: (error as Error).message });
    }
  }

  // GET: Obter uma corrida por ID
  async getById(req: Request, res: Response): Promise<Response> {
    const id_racing = parseInt(req.params.id_racing!, 10);
    if (isNaN(id_racing)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    try {
      const race = await this.racingService.getById(id_racing);
      return res.status(200).json(race);
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }

  // PUT: Atualizar uma corrida por ID
  async update(req: Request, res: Response): Promise<Response> {
    const id_racing = parseInt(req.params.id_racing!, 10);
    if (isNaN(id_racing)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    try {
      const updatedRace = await this.racingService.update(id_racing, req.body);
      return res.status(200).json(updatedRace);
    } catch (error) {
      return res.status(400).json({ message: (error as Error).message });
    }
  }

  // DELETE: Remover uma corrida por ID
  async delete(req: Request, res: Response): Promise<Response> {
    const id_racing = parseInt(req.params.id_racing!, 10);
    if (isNaN(id_racing)) {
      return res.status(400).json({ message: 'ID inválido.' });
    }

    try {
      await this.racingService.delete(id_racing);
      return res.status(204).send();
    } catch (error) {
      return res.status(404).json({ message: (error as Error).message });
    }
  }
}
