import { useEffect } from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export type WasmMarkdownEditorProps = {};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const WasmMarkdownEditor: React.FC = (props) => {
  useEffect(() => {
    (async () => {
      const { WasmMarkdownEditor } = await import('../../../../wasm/pkg');
      WasmMarkdownEditor.new();
    })();
  }, []);

  return (
    <div id="wasm-markdown-editor">
      <canvas id="wasm-markdown-editor-canvas" />
      <input id="wasm-markdown-editor-input" />
    </div>
  );
};
