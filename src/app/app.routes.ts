import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'products',
    loadComponent: () =>
      import('./products/products/products.component').then(
        (c) => c.ProductsComponent
      ),
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./todos/todos/todos.component').then((c) => c.TodosComponent),
  },
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'products',
  },
];
