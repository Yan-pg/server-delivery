import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Category from './Category';

@Entity('products')
class Products {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  product_id: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'product_id' })
  product: Category;

  @Column()
  name: string;

  @Column('numeric')
  price: number;

  @Column()
  description: string;

  @Column()
  @Exclude()
  productImage: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'productImage_url' })
  getcategoryImage_url(): string | null {
    return this.productImage
      ? `http://192.168.1.118:3333/files/${this.productImage}`
      : null;
  }
}

export default Products;
