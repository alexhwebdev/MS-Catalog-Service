import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";

export class CreateProductRequest {
  // These are decorators responsible to validate specific parameter. 
  // Its a property decorator. 
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsString()
  description!: string;

  @IsNumber()
  @Min(1)
  price!: number;

  @IsNumber()
  stock!: number;
}

export class UpdateProductRequest {
  name?: string;

  description?: string;

  price?: number;

  @IsNumber()
  stock?: number;
}


/*
DTO : 
  - Data Transfer Object
  - Responsible to parse data / tranform data / some form of data to structured data.
*/