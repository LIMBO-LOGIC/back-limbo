import { Repository } from 'typeorm';
import { RacingBet } from '../entities/RacingBet';
import { AppDataSource } from '../config/database';

export class RacingBetService {
  private racingBetRepository: Repository<RacingBet>;

  constructor() {
    this.racingBetRepository = AppDataSource.getRepository(RacingBet);
  }

  // Criar uma nova aposta de corrida
  async create(racingId: number, userId: number): Promise<RacingBet> {
    const racingBet = this.racingBetRepository.create({
      racing: { id_racing: racingId },
      user: { id: userId },
    });

    return await this.racingBetRepository.save(racingBet);
  }

  // Listar todas as apostas
  async getAll(): Promise<RacingBet[]> {
    return await this.racingBetRepository.find({
      relations: ['racing', 'user'],
    });
  }

  // Obter uma aposta por ID
  async getById(id_racing_bet: number): Promise<RacingBet | null> {
    return await this.racingBetRepository.findOne({
      where: { id_racing_bet },
      relations: ['racing', 'user'],
    });
  }

  // Obter uma aposta por ID do usuário
  async getByUserId(userId: number): Promise<RacingBet[] | null> {
    return await this.racingBetRepository.find({
      where: { user: {id: userId}},
      relations: ['racing', 'user'],
    });
  }

  // Atualizar uma aposta
  async update(
    id_racing_bet: number,
    racingId: number,
    userId: number
  ): Promise<RacingBet> {
    const racingBet = await this.getById(id_racing_bet);
    if (!racingBet) {
      throw new Error('Aposta não encontrada');
    }

    racingBet.racing.id_racing = racingId;
    racingBet.user.id = userId;

    return await this.racingBetRepository.save(racingBet);
  }

  // Remover uma aposta
  async delete(id_racing_bet: number): Promise<void> {
    const racingBet = await this.getById(id_racing_bet);
    if (!racingBet) {
      throw new Error('Aposta não encontrada');
    }

    await this.racingBetRepository.remove(racingBet);
  }
}
