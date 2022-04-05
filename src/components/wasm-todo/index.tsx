export const WasmTodo: React.VFC = () => {
  const append = async () => {
    const { Todo } = await import('wasm');

    const id = window.prompt('id', '')!;
    const text = window.prompt('text', '')!;
    const todo = Todo.new(id, text);
    // eslint-disable-next-line no-console
    console.log(todo);
  };

  return (
    <div>
      <button onClick={append}>append</button>
    </div>
  );
};
