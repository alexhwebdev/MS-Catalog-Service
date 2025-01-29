// import { CreateProductRequest } from "../dto/product.dto";
import { ICatalogRepository } from "../interface/catalogRepository.interface";
import { OrderWithLineItems } from "../types/message.type";

export class CatalogService {
  // private : TS by default sets properties to public. 
  // So set to private to not expose our repository to 
  // any other classes outside while this instance is 
  // being created.
  private _repository: ICatalogRepository;

  // This allows functionality at the bottom (createProduct, updateProduct, etc...) to access repository
  constructor(repository: ICatalogRepository) {
    this._repository = repository;
  }
  
  async createProduct(input: any) {
    // console.log('this._repository ', this._repository)
    const data = await this._repository.create(input);
    console.log('catalog.service data 6', data)
    if (!data.id) {
      throw new Error("unable to create product");
    }
    return data;
  }

  async updateProduct(input: any) {
    const data = await this._repository.update(input);
    if (!data.id) {
      throw new Error("unable to update product");
    }
    // emit event to update record in Elastic search
    return data;
  }

  // instead of this we will get product from Elastic search
  async getProducts(limit: number, offset: number) {
    const products = await this._repository.find(limit, offset);

    return products;
  }

  async getProduct(id: number) {
    const product = await this._repository.findOne(id);
    return product;
  }

  async deleteProduct(id: number) {
    const response = await this._repository.delete(id);
    // delete record from Elastic search
    return response;
  }

  async getProductStock(ids: number[]) {
    const products = await this._repository.findStock(ids);
    if (!products) {
      throw new Error("unable to find product stock details");
    }
    return products;
  }
  // L26 22mm
  async handleBrokerMesage(message: any) {
    console.log("-------------------> CATALOG_SERVICE handleBrokerMesage");
    console.log("Catalog Service received message", message);
    const orderData = message.data as OrderWithLineItems;
    console.log("CATALOG_SERVICE - handleBrokerMesage : orderData", orderData);
    const { orderItems } = orderData;
    console.log("CATALOG_SERVICE - handleBrokerMesage : orderItems", orderItems);
    orderItems.forEach(async (item) => {
      console.log("CATALOG_SERVICE - Updating stock for product : item.productId, item.qty");
      console.log("CATALOG_SERVICE - Updating stock for product", item.productId, item.qty);
      const product = await this.getProduct(item.productId);
      if (!product) {
        console.log(
          "Product not found during stock update for create order", 
          item.productId
        );
      } else {
        // update stock
        const updatedStock = product.stock - item.qty;
        // L25 52mm : NEED TO IMPLEMENT IF ORDER GOT CANCELLED
        await this.updateProduct({ 
          ...product, 
          stock: updatedStock 
        });
      }
      // perform stock update operation
    });
    // Perform action based
  }
}
