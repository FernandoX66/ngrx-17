import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { lastValueFrom, map } from 'rxjs';

import { Product } from '../store/products-state.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  readonly #http = inject(HttpClient);
  readonly apiUrl = 'https://dummyjson.com';

  getAllProducts(): Promise<Product[]> {
    return lastValueFrom(
      this.#http
        .get<{ products: Product[] }>(`${this.apiUrl}/products`)
        .pipe(map((response) => response.products))
    );
  }
}
