import { Request, Response } from 'express';
import { ProductService } from '../services/ProductService';

export class ProductController {
  private productService: ProductService;

  constructor() {
    this.productService = new ProductService();
  }

  // Criar produto
  async create(req: Request, res: Response): Promise<Response> {
    try {
      const product = await this.productService.create(req.body);
      return res.status(201).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Obter todos os produtos
  async getAll(_req: Request, res: Response): Promise<Response> {
    try {
      const products = await this.productService.getAll();
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ message: 'Erro ao buscar produtos' });
    }
  }

  // Obter um produto por ID
  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await this.productService.getById(Number(id));
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }

  // Atualizar produto
  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const product = await this.productService.update(Number(id), req.body);
      return res.status(200).json(product);
    } catch (error: any) {
      return res.status(400).json({ message: error.message });
    }
  }

  // Excluir produto
  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.productService.delete(Number(id));
      return res.status(204).json({ message: 'Product deleted successfully' });
    } catch (error: any) {
      return res.status(404).json({ message: error.message });
    }
  }
}
