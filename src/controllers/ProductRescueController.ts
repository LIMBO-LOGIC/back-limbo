import { Request, Response } from 'express';
import { ProductRescueService } from '../services/ProductRescueService';

export class ProductRescueController {
  private productRescueService: ProductRescueService;

  constructor() {
    this.productRescueService = new ProductRescueService();
  }

  // POST: Criar um novo resgate de produto
  async createRescuedProduct(req: Request, res: Response): Promise<Response> {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: 'userId e productId são obrigatórios' });
    }

    try {
      const rescuedProduct =
        await this.productRescueService.createRescuedProduct(userId, productId);
      return res.status(201).json(rescuedProduct);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao criar resgate de produto',
        error: (error as Error).message,
      });
    }
  }

  // GET: Buscar produtos resgatados por ID de usuário
  async getRescuedProductsByUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = parseInt(req.params.userId ?? '', 10);

    if (isNaN(userId)) {
      return res
        .status(400)
        .json({ message: 'ID de usuário inválido ou ausente' });
    }

    try {
      const products = await this.productRescueService.getRescuedProductsByUser(
        userId
      );
      return res.json(products);
    } catch (error) {
      return res.status(500).json({
        message: 'Erro ao buscar produtos resgatados',
        error: (error as Error).message,
      });
    }
  }

  async deleteRescuedProduct(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.productRescueService.deleteRescuedProduct(Number(id));
      return res.status(204).send('Success');
    } catch (err) {
      return res.status(500).json({
        message: 'Erro ao deletar resgate de produto',
        error: (err as Error).message,
      });
    }
  }
}
