export interface ProductsState {
  products: Product[];
  query: string;
}

export interface Product {
  id: number;
  title: string;
  description: string;
}
