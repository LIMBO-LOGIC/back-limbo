import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { FavoriteProduct } from './FavoriteProduct';
import { ProductRescue } from './ProductRescue';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 50 })
  name!: string;

  @Column({ type: 'varchar', length: 50 })
  description!: string;

  @Column({ type: 'varchar', length: 50 })
  details!: string;

  @Column({ type: 'bigint' })
  change_points!: number;

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
