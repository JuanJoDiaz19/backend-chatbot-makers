import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../entities/category.entity';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    return await this.categoryRepository.save(createCategoryDto);
  }

  findAll() {
    return this.categoryRepository.find({
        relations: ["products"]
    });
  }

  findOne(name: string) {
    return this.categoryRepository.findOneBy({name: name});
  }

  async update(name: string, updateCategoryDto: UpdateCategoryDto) {
    
    const category = await this.categoryRepository.preload({
        name: name, 
        ... updateCategoryDto
      });

      if ( !category ) throw new NotFoundException(`Category with id: ${ category } not found`);

      try {
          await this.categoryRepository.save( category );
          return category;
      } catch (error) {
          console.log(error)
      } 
  }

  async remove(id: string) {
    try {
      const category : Category = await this.findOne(id);

      return this.categoryRepository.delete(category);
    } catch (error) {
        throw new NotFoundException(error.message);
    }
  }

  async seed(){ 
    this.create({
        name: "Laptops"
    });
      
    this.create({
        name: "Monitores"
    });
      
    this.create({
        name: "Accesorios"
    });
      
    this.create({
        name: "Componentes"
    });
      
  }
}
