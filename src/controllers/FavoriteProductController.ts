import { Request, Response } from 'express';
import { FavoriteProductService } from '../services/FavoriteProductsService';
export class FavoriteProductController {
  private favoriteProductService: FavoriteProductService;

  constructor() {
    this.favoriteProductService = new FavoriteProductService();
  }

  async createFavoriteProduct(req: Request, res: Response): Promise<Response> {
    const { userId, productId } = req.body;

    if (!userId || !productId) {
      return res
        .status(400)
        .json({ message: 'userId e productId são obrigatórios' });
    }

    try {
      const favoriteProduct =
        await this.favoriteProductService.createFavoriteProduct(
          userId,
          productId
        );
      return res.status(201).json(favoriteProduct);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  async getFavoriteProductsByUser(
    req: Request,
    res: Response
  ): Promise<Response> {
    const userId = parseInt(req.params.userId ?? '', 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: 'Invalid or missing user ID.' });
    }

    try {
      const favoriteProducts =
        await this.favoriteProductService.getFavoriteProductsByUser(userId);
      return res.json(favoriteProducts);
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }

  async deleteFavoriteProduct(req: Request, res: Response): Promise<Response> {
    const favoriteProductId = parseInt(req.params.id!, 10);

    if (isNaN(favoriteProductId)) {
      return res.status(400).json({ message: 'Invalid favorite product ID.' });
    }

    try {
      await this.favoriteProductService.deleteFavoriteProduct(
        favoriteProductId
      );
      return res.status(204).send('Favorite product deleted successfully.');
    } catch (err) {
      return res.status(500).json({ message: (err as Error).message });
    }
  }
}
