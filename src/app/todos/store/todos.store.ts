import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';

import { TodosState } from './todos-state.interface';
import { computed, inject } from '@angular/core';
import { Todo } from './todo.interface';
import { TodosService } from '../services/todos.service';

const initialState: TodosState = {
  todos: [],
};

export const TodosStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ todos }) => ({
    completedTodos: computed(() => todos().filter((todo) => todo.completed)),
  })),
  withMethods((store, todosService = inject(TodosService)) => ({
    loadAll: async () => {
      const todos = await todosService.getAll();
      patchState(store, { todos });
    },
    addTodo: async (todo: Todo) => {
      await todosService.addOne(todo);
      patchState(store, { todos: [...store.todos(), todo] });
    },
  })),
  withHooks({
    onInit: (store) => store.loadAll(),
  })
);
