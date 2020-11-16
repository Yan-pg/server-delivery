import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Expose, Exclude } from 'class-transformer';

@Entity('Categories')
class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  @Exclude()
  categoryImage: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'categoryImage_url' })
  getcategoryImage_url(): string | null {
    return this.categoryImage
      ? `http://192.168.1.118:3333/files/${this.categoryImage}`
      : null;
  }
}

export default Category;
