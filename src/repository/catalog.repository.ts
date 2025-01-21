import { PrismaClient } from "@prisma/client";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { Product } from "../models/product.model";
import { NotFoundError } from "../utils";
// import { ProductFactory } from "../utils/fixtures";

// CatalogRepository class responsible for handling data access logic, interacting w/ DB or external data source to retrieve, save, update, or delete catalog-related information.
export class CatalogRepository implements ICatalogRepository {
  _prisma: PrismaClient;

  constructor() {
    this._prisma = new PrismaClient();
  }

  async create(data: Product): Promise<Product> {
    return this._prisma.product.create({
      data,
    });
  }
  async update(data: Product): Promise<Product> {
    return this._prisma.product.update({
      where: { id: data.id },
      data,
    });
  }
  async delete(id: any) {
    return this._prisma.product.delete({
      where: { id },
    });
  }
  async find(limit: number, offset: number): Promise<Product[]> {
    return this._prisma.product.findMany({
      take: limit,
      skip: offset,
    });
  }
  async findOne(id: number): Promise<Product> {
    const product = await this._prisma.product.findFirst({
      where: { id },
    });
    if (product) {
      return Promise.resolve(product);
    }
    throw new NotFoundError("product not found");
  }

  // // BEFORE ADDING PRISMA
  // async create(data: Product): Promise<Product> {
  //   // throw new Error("Method not implemented.")
  //   const product = ProductFactory.build()
  //   return Promise.resolve(product)
  // }
  // async update(data: Product): Promise<Product> {
  //   // throw new Error("Method not implemented.")
  //   const product = ProductFactory.build()
  //   return Promise.resolve(product)
  // }
  // async delete(id: any) {
  //   // throw new Error("Method not implemented.")
  //   const product = ProductFactory.build()
  //   return Promise.resolve(product)
  // }
  // async find(limit: number, offset: number): Promise<Product[]> {
  //   // throw new Error("Method not implemented.")
  //   const products = ProductFactory.buildList(limit)
  //   return Promise.resolve(products)
  // }
  // async findOne(id: number): Promise<Product> {
  //   // throw new Error("Method not implemented.")
  //   const product = ProductFactory.build()
  //   return Promise.resolve(product)
  // }
}
