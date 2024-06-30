import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
    PrimaryColumn,
  } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Category {

    @PrimaryColumn()
    name: string;
    
    @OneToMany(()=>Product, (product)=>product.category)
    products: Product[];
}
