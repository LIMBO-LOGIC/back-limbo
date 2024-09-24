import { Repository } from 'typeorm';
import { ProductRescue } from '../entities/ProductRescue';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { Product } from '../entities/Product';

export class ProductRescueService {
  private productRescueRepository: Repository<ProductRescue>;
  private userRepository: Repository<User>;
  private productRepository: Repository<Product>;

  constructor() {
    this.productRescueRepository = AppDataSource.getRepository(ProductRescue);
    this.userRepository = AppDataSource.getRepository(User);
    this.productRepository = AppDataSource.getRepository(Product);
  }

  // Criar uma nova relação entre usuário e produto resgatado
  async createRescuedProduct(userId: number, productId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    const productRescue = this.productRescueRepository.create({
      user,
      product,
    });

    return await this.productRescueRepository.save(productRescue);
  }

  // Buscar produtos resgatados por ID de usuário
  async getRescuedProductsByUser(userId: number) {
    return await this.productRescueRepository.find({
      where: { user: { id: userId } },
      relations: ['product'], // Para trazer os detalhes do produto relacionado
    });
  }

  async deleteRescuedProduct(productRescueId: number): Promise<void> {
    const productRescue = await this.productRescueRepository.findOneBy({
      id: productRescueId,
    });

    if (!productRescue) {
      throw new Error('ProductRescue not found');
    }

    await this.productRescueRepository.remove(productRescue);
  }
}
