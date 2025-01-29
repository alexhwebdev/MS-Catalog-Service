import express, { Request, Response, NextFunction } from "express";
import { CatalogService } from "../services/catalog.service";
import { CatalogRepository } from "../repository/catalog.repository";
import { RequestValidator } from "../utils/requestValidator";
import { CreateProductRequest, UpdateProductRequest } from "../dto/product.dto";
import { BrokerService } from "../services/broker.service";

const router = express.Router();

// Passing the CatalogRepository instance to CatalogService:
export const catalogService = new CatalogService(
  new CatalogRepository() // New instance of CatalogRepository
);

const brokerService = new BrokerService(catalogService);  // catalogService from above code
brokerService.initializeBroker();

// endpoints
router.post("/products", async (req: Request, res: Response, next: NextFunction) => {
  console.log('catalog.routes - 1, CreateProductRequest ', CreateProductRequest)
  console.log('catalog.routes - 2, req.body ', req.body)
  try {
    // Validate request
    const { errors, input } = await RequestValidator(
      CreateProductRequest, // DTO
      req.body
    );
    // if (errors) return res.status(400).json(errors); // This causes TS error for -->  async (req: Request, res: Response, next: NextFunction)
    if (errors) res.status(400).json(errors); // This is the FIX
    // const data = await catalogService.createProduct(req.body);
    console.log('catalog.routes - 5, input ', input)
    console.log('catalog.routes - 5, TEST ', input.name)
    // CreateProductRequest {
    //   name: '3rd data',
    //   description: '3rd data description',
    //   stock: 300,
    //   price: 30
    // }


    const data = await catalogService.createProduct(input);
    console.log('catalog.routes - 7, data ', data)
    res.status(201).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(500).json(err.message);
  }
});

router.patch("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { errors, input } = await RequestValidator(
      UpdateProductRequest,
      req.body
    );

    const id = parseInt(req.params.id) || 0;

    // if (errors) return res.status(400).json(errors);
    if (errors) { res.status(400).json(errors); }

    const data = await catalogService.updateProduct({ 
      id, ...input 
    });
    res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(500).json(err.message);
  }
});

router.get("/products", async (req: Request, res: Response, next: NextFunction) => {
  console.log('req ', typeof req)
  console.log('res ', typeof res)

  const limit = Number(req.query["limit"]);
  const offset = Number(req.query["offset"]);
  try {
    const data = await catalogService.getProducts(limit, offset);
    res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(500).json(err.message);
  }
});

router.get("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id) || 0;
  try {
    const data = await catalogService.getProduct(id);
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/products/:id", async (req: Request, res: Response, next: NextFunction) => {
  const id = parseInt(req.params.id) || 0;
  try {
    const data = await catalogService.deleteProduct(id);
    res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    res.status(500).json(err.message);
  }
});

router.post("/products/stock", async (req: Request, res: Response) => {
  try {
    const data = await catalogService.getProductStock(req.body.ids);
    // return res.status(200).json(data);
    res.status(200).json(data);
  } catch (error) {
    const err = error as Error;
    // return res.status(500).json(err.message);
    res.status(500).json(err.message);
  }
});

export default router;
