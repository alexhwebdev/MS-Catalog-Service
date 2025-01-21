"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
class Product {
    constructor(
    // TS by default, all properties are public
    // In constructor while initializing, if 'public' is not set here, it will remain private
    name, description, price, stock, id) {
        this.name = name;
        this.description = description;
        this.price = price;
        this.stock = stock;
        this.id = id;
    }
}
exports.Product = Product;
