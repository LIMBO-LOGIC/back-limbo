import { Request, Response } from 'express';
import { ProductRescueService } from '../services/productRescueService';

export class ProductRescueController {
  private productRescueService: ProductRescueService;

  constructor() {
    this.productRescueService = new ProductRescueService();
  }

  // GET: Buscar produtos resgatados por ID de usuário
  async getRescuedProductsByUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = parseInt(req.params.userId, 10);

    try {
      const products = await this.productRescueService.getRescuedProductsByUser(
        userId
      );
      return res.json(products);
    } catch (error) {
      return res.status(500).json({
        message: 'Error fetching rescued products',
        error: (error as Error).message,
      });
    }
  }
}
