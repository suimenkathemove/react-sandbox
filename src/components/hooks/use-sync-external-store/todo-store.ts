type Todos = { id: number; text: string }[];

let nextId = 0;
let todos: Todos = [];
let listeners: (() => void)[] = [];

export const todosStore = {
  addTodo(): void {
    todos = [...todos, { id: nextId++, text: `${nextId}` }];
    emitChange();
  },
  subscribe(listener: () => void): () => void {
    listeners = listeners.concat(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },
  getSnapshot(): Todos {
    return todos;
  },
};

const emitChange = (): void => {
  listeners.forEach((l) => {
    l();
  });
};
