import { Repository } from 'typeorm';
import { ProductRescue } from '../entities/ProductRescue';
import { AppDataSource } from '../config/database';

export class ProductRescueService {
  private productRescueRepository: Repository<ProductRescue>;

  constructor() {
    this.productRescueRepository = AppDataSource.getRepository(ProductRescue);
  }
  async getRescuedProductsByUser(userId: number) {
    const productRescueRepository = this.productRescueRepository;
    return await productRescueRepository.find({
      where: { user: { id: userId } },
      relations: ['product'], // Para trazer os detalhes do produto relacionado
    });
  }
}
