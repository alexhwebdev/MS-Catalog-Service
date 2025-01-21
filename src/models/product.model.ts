export class Product {
  constructor(
    // TS by default, all properties are public
    // In constructor while initializing, if 'public' is not set here, it will remain private
    public readonly name: string,
    public readonly description: string,
    public readonly price: number,
    public readonly stock: number,
    public readonly id?: number
  ) {}
}