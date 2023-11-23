import { RouterOutlet } from '@angular/router';
import { Component } from '@angular/core';

import { MatFormFieldModule } from '@angular/material/form-field';

import { ProductsComponent } from './products/products/products.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ProductsComponent, MatFormFieldModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {}
