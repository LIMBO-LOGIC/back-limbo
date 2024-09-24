import { Repository } from 'typeorm';
import { FavoriteProduct } from '../entities/FavoriteProduct';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { AppDataSource } from '../config/database';

export class FavoriteProductService {
  private favoriteProductRepository: Repository<FavoriteProduct>;
  private userRepository: Repository<User>;
  private productRepository: Repository<Product>;

  constructor() {
    this.favoriteProductRepository =
      AppDataSource.getRepository(FavoriteProduct);
    this.userRepository = AppDataSource.getRepository(User);
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async createFavoriteProduct(userId: number, productId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    const product = await this.productRepository.findOneBy({ id: productId });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    const favoriteProduct = this.favoriteProductRepository.create({
      user,
      product,
    });

    return await this.favoriteProductRepository.save(favoriteProduct);
  }

  async getFavoriteProductsByUser(userId: number) {
    return await this.favoriteProductRepository.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });
  }

  async deleteFavoriteProduct(favoriteProductId: number): Promise<void> {
    const favoriteProduct = await this.favoriteProductRepository.findOneBy({
      id: favoriteProductId,
    });

    if (!favoriteProduct) {
      throw new Error('Favorite product not found.');
    }

    await this.favoriteProductRepository.remove(favoriteProduct);
  }
}
