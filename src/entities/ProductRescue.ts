import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';
import { Product } from './Product';

@Entity('productRescue')
export class ProductRescue {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.id)
  user!: User;

  @ManyToOne(() => Product, (product) => product.productRescue)
  product!: Product;
}
