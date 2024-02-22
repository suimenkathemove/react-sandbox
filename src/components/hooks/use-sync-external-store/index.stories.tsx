import { Meta, StoryObj } from '@storybook/react';
import { useSyncExternalStore } from 'react';

import { todosStore } from './todo-store';

export default {
  component: () => null,
} satisfies Meta;

const Todos: React.FC = () => {
  const todos = useSyncExternalStore(
    todosStore.subscribe,
    todosStore.getSnapshot,
  );

  return (
    <div>
      <button
        onClick={() => {
          todosStore.addTodo();
        }}
      >
        Add todo
      </button>
      <hr />
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.text}</li>
        ))}
      </ul>
    </div>
  );
};

export const Default: StoryObj = {
  render: () => {
    return (
      <div style={{ display: 'flex' }}>
        <Todos />
        <Todos />
      </div>
    );
  },
};
