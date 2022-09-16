use wasm_bindgen::prelude::wasm_bindgen;

pub fn main() {
    bare_bone();
    using_a_macro();
    using_web_sys();
}

#[wasm_bindgen]
extern "C" {
    // to bind `console.log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);
}

fn bare_bone() {
    log("Hello, World!");
    log_u32(0);
}

macro_rules! console_log {
    ($($t:tt)*) => {
       log(&format_args!($($t)*).to_string())
    };
}

fn using_a_macro() {
    console_log!("Hello, {}!", "World");
}

fn using_web_sys() {
    use web_sys::console;

    console::log_1(&"log_1".into());

    let log_3_arg = &"log_3".into();
    console::log_3(log_3_arg, log_3_arg, log_3_arg);
}
