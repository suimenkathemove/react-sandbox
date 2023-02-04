use wasm_bindgen::{prelude::wasm_bindgen, JsCast};

#[wasm_bindgen]
pub struct WasmMarkdownEditor;

#[wasm_bindgen]
impl WasmMarkdownEditor {
    pub fn main() {
        let document = web_sys::window().unwrap().document().unwrap();
        let canvas = document.get_element_by_id("wasm-markdown-editor").unwrap();
        let canvas = canvas.dyn_into::<web_sys::HtmlCanvasElement>().unwrap();

        let ctx = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<web_sys::CanvasRenderingContext2d>()
            .unwrap();

        ctx.set_font("48px serif");
        ctx.fill_text("Hello world", 10., 50.).unwrap();
    }
}
