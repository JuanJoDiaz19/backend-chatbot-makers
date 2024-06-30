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
      name: "Computadora HP pavilion 15",
      quantity: 10,
      characteristics: "Bastante veloz",
      price: 45000,
      score: 4.5,
      categoryName: "Laptops"
    });
    
    this.create({
      name: "Monitor Samsung 24 pulgadas",
      quantity: 25,
      characteristics: "Alta resolución y buena frecuencia de actualización",
      price: 12000,
      score: 4.7,
      categoryName: "Monitores"
    });
    
    this.create({
      name: "Teclado Mecánico Razer",
      quantity: 50,
      characteristics: "Retroiluminación RGB y switches mecánicos",
      price: 7000,
      score: 4.8,
      categoryName: "Accesorios"
    });
    
    this.create({
      name: "Mouse Inalámbrico Logitech",
      quantity: 40,
      characteristics: "Precisión y duración de batería prolongada",
      price: 3500,
      score: 4.6,
      categoryName: "Accesorios"
    });
    
    this.create({
      name: "Auriculares Sony WH-1000XM4",
      quantity: 15,
      characteristics: "Cancelación de ruido de alta calidad",
      price: 22000,
      score: 4.9,
      categoryName: "Accesorios"
    });
    
    this.create({
      name: "Impresora Epson EcoTank L3150",
      quantity: 20,
      characteristics: "Impresión económica y eficiente",
      price: 15000,
      score: 4.4,
      categoryName: "Componentes"
    });
    
    this.create({
      name: "Tablet Apple iPad Air",
      quantity: 30,
      characteristics: "Pantalla Retina y potente chip A14",
      price: 60000,
      score: 4.8,
      categoryName: "Laptops"
    });
    
    this.create({
      name: "Disco Duro Externo Seagate 2TB",
      quantity: 60,
      characteristics: "Gran capacidad de almacenamiento y portabilidad",
      price: 5000,
      score: 4.6,
      categoryName: "Componentes"
    });
    
    this.create({
      name: "Smartwatch Garmin Forerunner 245",
      quantity: 25,
      characteristics: "Ideal para seguimiento de actividad física",
      price: 28000,
      score: 4.7,
      categoryName: "Accesorios"
    });
    
    this.create({
      name: "Cámara Canon EOS M50",
      quantity: 10,
      characteristics: "Cámara mirrorless con alta calidad de imagen",
      price: 85000,
      score: 4.9,
      categoryName: "Componentes"
    });
    
  }
}
