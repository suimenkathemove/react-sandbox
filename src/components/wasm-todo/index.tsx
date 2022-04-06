export const WasmTodo: React.VFC = () => {
  const show = async () => {
    const { List } = await import('wasm');

    // eslint-disable-next-line no-console
    console.log(List.show());
  };

  const create = async () => {
    const { List } = await import('wasm');

    const id = window.prompt('id');
    const text = window.prompt('text');
    if (id != null && text != null) {
      List.create({ id, text });
    }
  };

  const update = async () => {
    const { List } = await import('wasm');

    const id = window.prompt('id');
    const text = window.prompt('text');
    if (id != null && text != null) {
      List.update({ id, text });
    }
  };

  const delete_ = async () => {
    const { List } = await import('wasm');

    const id = window.prompt('id');
    if (id != null) {
      List.delete(id);
    }
  };

  return (
    <div>
      <button onClick={show}>show</button>
      <button onClick={create}>create</button>
      <button onClick={update}>update</button>
      <button onClick={delete_}>delete</button>
    </div>
  );
};
