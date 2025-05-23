import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteProduct } from './FavoriteProduct';
import { ProductRescue } from './ProductRescue';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 80 })
  name!: string;

  @Column({ type: 'varchar', length: 200 })
  description!: string;

  @Column({ type: 'varchar', length: 200 })
  details!: string;

  @Column({ type: 'bigint' })
  change_points!: number;

  @Column({ type: 'float' })
  price!: number;

  @Column({ type: 'boolean' })
  active!: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  registration_date!: Date;

  @Column({ type: 'varchar', length: 255 })
  image!: string;

  @OneToMany(
    () => FavoriteProduct,
    (favoriteProduct) => favoriteProduct.product
  )
  favoriteProduct!: FavoriteProduct[];

  @OneToMany(() => ProductRescue, (productRescue) => productRescue.product)
  productRescue!: ProductRescue[];
}
