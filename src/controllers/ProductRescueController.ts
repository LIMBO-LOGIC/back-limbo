import { Request, Response } from 'express';
import { ProductRescueService } from '../services/ProductRescueService';

export class ProductRescueController {
  private productRescueService: ProductRescueService;

  constructor() {
    this.productRescueService = new ProductRescueService();
  }

  // GET: Buscar produtos resgatados por ID de usuário
  // GET: Buscar produtos resgatados por ID de usuário
  async getRescuedProductsByUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = parseInt(req.params.userId ?? '', 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid or missing userId' });
    }

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
