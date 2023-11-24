import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TodosStore } from '../store/todos.store';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
  ],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.scss',
})
export class TodosComponent {
  protected readonly todosStore = inject(TodosStore);
  readonly #fb = inject(NonNullableFormBuilder);

  form = this.#fb.group({
    title: [''],
    completed: [false],
  });

  onSubmit(): void {
    if (this.form.invalid) return;
    this.todosStore.addTodo(this.form.getRawValue());
    this.form.reset();
  }
}
