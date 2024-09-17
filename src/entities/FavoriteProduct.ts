import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity('favoriteProducts')
export class FavoriteProduct {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @ManyToOne(() => Product, (product) => product.id)
  product!: Product;
}
