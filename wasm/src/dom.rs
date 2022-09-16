use wasm_bindgen::JsValue;
use web_sys::window;

pub fn main() -> Result<(), JsValue> {
    let window = window().expect("no window");
    let document = window.document().expect("no document");
    let body = document.body().expect("no body");

    let p = document.create_element("p")?;
    p.set_text_content(Some("Hello, World!"));

    body.append_child(&p)?;

    Ok(())
}
