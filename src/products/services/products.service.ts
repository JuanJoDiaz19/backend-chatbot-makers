import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  async create(createProductDto: CreateProductDto) {
    const {categoryName, ...productDto} = createProductDto;
    const category = await this.categoryRepository.findOneBy({name: categoryName});
    const product = {
      ...productDto,
      category
    }
    return await this.productRepository.save(product);
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: string) {
    return this.productRepository.findOneBy({id: id});
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    
    const product = await this.productRepository.preload({
        id: id, 
        ... updateProductDto
      });

      if ( !product ) throw new NotFoundException(`Address with id: ${ id } not found`);

      try {
          await this.productRepository.save( product );
          return product;
      } catch (error) {
          console.log(error)
      } 
  }

  async remove(id: string) {
    try {
      const order : Product = await this.findOne(id);

      return this.productRepository.delete(order);
    } catch (error) {
        throw new NotFoundException(error.message);
    }
  }

  async seed() {
    this.create({
      name: "HP Pavilion 15 Laptop",
      quantity: 10,
      characteristics: "Quite fast",
      price: 45000,
      score: 4.5,
      categoryName: "Laptops"
    });
    
    this.create({
      name: "Samsung 24-inch Monitor",
      quantity: 25,
      characteristics: "High resolution and good refresh rate",
      price: 12000,
      score: 4.7,
      categoryName: "Monitors"
    });
    
    this.create({
      name: "Razer Mechanical Keyboard",
      quantity: 50,
      characteristics: "RGB backlighting and mechanical switches",
      price: 7000,
      score: 4.8,
      categoryName: "Accessories"
    });
    
    this.create({
      name: "Logitech Wireless Mouse",
      quantity: 40,
      characteristics: "Precision and long battery life",
      price: 3500,
      score: 4.6,
      categoryName: "Accessories"
    });
    
    this.create({
      name: "Sony WH-1000XM4 Headphones",
      quantity: 15,
      characteristics: "High-quality noise cancellation",
      price: 22000,
      score: 4.9,
      categoryName: "Accessories"
    });
    
    this.create({
      name: "Epson EcoTank L3150 Printer",
      quantity: 20,
      characteristics: "Economic and efficient printing",
      price: 15000,
      score: 4.4,
      categoryName: "Components"
    });
    
    this.create({
      name: "Apple iPad Air Tablet",
      quantity: 30,
      characteristics: "Retina display and powerful A14 chip",
      price: 60000,
      score: 4.8,
      categoryName: "Laptops"
    });
    
    this.create({
      name: "Seagate 2TB External Hard Drive",
      quantity: 60,
      characteristics: "Large storage capacity and portability",
      price: 5000,
      score: 4.6,
      categoryName: "Components"
    });
    
    this.create({
      name: "Garmin Forerunner 245 Smartwatch",
      quantity: 25,
      characteristics: "Ideal for activity tracking",
      price: 28000,
      score: 4.7,
      categoryName: "Accessories"
    });
    
    this.create({
      name: "Canon EOS M50 Camera",
      quantity: 10,
      characteristics: "Mirrorless camera with high image quality",
      price: 85000,
      score: 4.9,
      categoryName: "Components"
    });
    
    
  }
}
