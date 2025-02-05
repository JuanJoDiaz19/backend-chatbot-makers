import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { ProductsService } from './products/services/products.service';
dotenv.config();

@Module({
  imports: [
    ProductsModule, 
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT,
    database: process.env.DB_NAME, 
    username: process.env.DB_USER, 
    password: process.env.DB_PASSWORD, 
    autoLoadEntities: true, 
    synchronize: true ,
  })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
