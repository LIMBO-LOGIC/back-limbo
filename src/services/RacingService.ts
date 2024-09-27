import { Repository } from 'typeorm';
import { AppDataSource } from '../config/database';
import { Racing } from '../entities/Racing';

export class RacingService {
  private racingRepository: Repository<Racing>;

  constructor() {
    this.racingRepository = AppDataSource.getRepository(Racing);
  }

  // Criar uma nova corrida
  async create(racingData: Partial<Racing>): Promise<Racing> {
    const {
      race_date,
      country_flag,
      circuit_location,
      circuit_image,
      status,
      round,
    } = racingData;

    // Validações básicas
    if (
      !race_date ||
      !country_flag ||
      !circuit_location ||
      !round ||
      !status ||
      !circuit_image
    ) {
      throw new Error(
        'Data da corrida, bandeira do país, localização do circuito e rodada são obrigatórios.'
      );
    }

    const racing = this.racingRepository.create({ ...racingData });
    return await this.racingRepository.save(racing);
  }

  // Listar todas as corridas
  async getAll(): Promise<Racing[]> {
    return await this.racingRepository.find({order: {
      race_date: 'ASC'
    }});
  }

  // Obter corrida por ID
  async getById(id_racing: number): Promise<Racing | null> {
    const racing = await this.racingRepository.findOneBy({ id_racing });
    if (!racing) {
      throw new Error('Corrida não encontrada.');
    }
    return racing;
  }

  // Atualizar corrida
  async update(
    id_racing: number,
    racingData: Partial<Racing>
  ): Promise<Racing> {
    const racing = await this.getById(id_racing);
    if (!racing) {
      throw new Error('Corrida não encontrada.');
    }

    Object.assign(racing, racingData);
    return await this.racingRepository.save(racing);
  }

  // Deletar corrida
  async delete(id_racing: number): Promise<void> {
    const racing = await this.getById(id_racing);
    if (!racing) {
      throw new Error('Corrida não encontrada.');
    }

    await this.racingRepository.remove(racing);
  }
}
