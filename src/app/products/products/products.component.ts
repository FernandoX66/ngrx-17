import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Component, inject } from '@angular/core';

import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

import { ProductsStore } from '../store/products.store';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatCardModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  protected readonly productsStore = inject(ProductsStore);
  protected readonly searchControl = new FormControl('', {
    nonNullable: true,
  });

  constructor() {
    this.productsStore.updateQuery(this.searchControl.valueChanges);
  }
}
