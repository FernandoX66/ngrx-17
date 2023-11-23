import { computed, inject } from '@angular/core';

import {
  withState,
  withMethods,
  withHooks,
  withComputed,
  signalStore,
  patchState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { debounceTime, distinctUntilChanged, pipe, tap } from 'rxjs';

import { ProductsState } from './products-state.interface';
import { ProductsService } from '../services/products.service';

const initialState: ProductsState = {
  products: [],
  query: '',
};

export const ProductsStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ products, query }) => {
    return {
      filteredProducts: computed(() =>
        products().filter((product) =>
          product.title
            .toLowerCase()
            .trim()
            .includes(query().toLowerCase().trim())
        )
      ),
    };
  }),
  withMethods(
    ({ products, ...store }, productsService = inject(ProductsService)) => {
      return {
        loadAllProducts: async () => {
          const products = await productsService.getAllProducts();
          patchState(store, { products });
        },
        updateQuery: rxMethod<string>(
          pipe(
            debounceTime(400),
            distinctUntilChanged(),
            tap((query) => patchState(store, { query }))
          )
        ),
      };
    }
  ),
  withHooks({
    onInit: ({ loadAllProducts }) => {
      loadAllProducts();
    },
  })
);
