use wasm_bindgen::{prelude::wasm_bindgen, JsValue};

mod canvas;
pub mod console_log;
mod coordinate;
pub mod dom;
pub mod finder;
pub mod game_of_life;
pub mod greet;
pub mod todo;
pub mod tree;
pub mod wasm_markdown_editor;

#[wasm_bindgen(start)]
pub fn main() -> Result<(), JsValue> {
    // console_log::main();
    // dom::main()?;

    Ok(())
}
