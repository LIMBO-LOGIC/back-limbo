import { AppDataSource } from '../config/database';
import { Product } from '../entities/Product';
import { Repository } from 'typeorm';

export class ProductService {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  // Criar um novo produto
  async create(productData: Partial<Product>): Promise<Product> {
    const { name, description, details, change_points, active, image } =
      productData;

    if (
      !name ||
      !description ||
      !change_points ||
      !active ||
      !image ||
      !details
    ) {
      throw new Error('Nome, descrição e pontos de troca são obrigatórios.');
    }

    const product = this.productRepository.create({
      ...productData,
      registration_date: new Date(),
    });

    return await this.productRepository.save(product);
  }

  // Listar todos os produtos
  async getAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  // Obter um produto por ID
  async getById(id: number): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) {
      throw new Error('Produto não encontrado');
    }
    return product;
  }

  // Atualizar um produto
  async update(id: number, productData: Partial<Product>): Promise<Product> {
    const product = await this.getById(id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    Object.assign(product, productData);

    return await this.productRepository.save(product);
  }

  // Remover um produto
  async delete(id: number): Promise<void> {
    const product = await this.getById(id);
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    await this.productRepository.remove(product);
  }
}
