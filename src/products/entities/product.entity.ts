import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
    OneToOne,
    OneToMany,
  } from 'typeorm';
import { Category } from './category.entity';

@Entity()
export class Product {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
    
    @Column()
    quantity: number;

    @Column()
    characteristics: string;

    @Column({type: 'decimal'})
    price: number;

    @Column({type: 'decimal'})
    score: number;

    @ManyToOne(()=> Category, (category)=>category.products)
    category: Category;

}
