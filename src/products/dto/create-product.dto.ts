import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {

    @IsString()
    name: string;
    
    @IsNumber()
    quantity: number;

    @IsString()
    characteristics: string;

    @IsNumber()
    price: number;

    @IsNumber()
    score: number;

    @IsString()
    categoryName: string;

}