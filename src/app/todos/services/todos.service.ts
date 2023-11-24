import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Todo } from '../store/todo.interface';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  readonly #http = inject(HttpClient);
  readonly apiUrl = 'http://localhost:3000';

  getAll(): Promise<Todo[]> {
    return firstValueFrom(this.#http.get<Todo[]>(`${this.apiUrl}/todos`));
  }

  addOne(todo: Todo): Promise<void> {
    return firstValueFrom(this.#http.post<void>(`${this.apiUrl}/todos`, todo));
  }
}
