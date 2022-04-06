use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Todo {
    id: String,
    text: String,
}

#[wasm_bindgen]
impl Todo {
    pub fn new(id: String, text: String) -> Todo {
        Todo { id, text }
    }

    #[wasm_bindgen(getter)]
    pub fn id(&self) -> String {
        self.id.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_id(&mut self, id: String) {
        self.id = id;
    }

    #[wasm_bindgen(getter)]
    pub fn text(&self) -> String {
        self.text.clone()
    }

    #[wasm_bindgen(setter)]
    pub fn set_text(&mut self, text: String) {
        self.text = text;
    }
}
