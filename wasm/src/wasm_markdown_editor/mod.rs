use std::{cell::RefCell, rc::Rc};
use wasm_bindgen::{
    prelude::{wasm_bindgen, Closure},
    JsCast,
};
use web_sys::{
    window, CanvasRenderingContext2d, HtmlCanvasElement, HtmlInputElement, InputEvent, MouseEvent,
};

#[wasm_bindgen]
pub struct WasmMarkdownEditor;

#[wasm_bindgen]
impl WasmMarkdownEditor {
    pub fn new() {
        let document = window().unwrap().document().unwrap();

        let canvas = document
            .create_element("canvas")
            .unwrap()
            .dyn_into::<HtmlCanvasElement>()
            .unwrap();
        document.body().unwrap().append_child(&canvas).unwrap();
        canvas.set_width(640);
        canvas.set_height(480);

        let input = document
            .create_element("input")
            .unwrap()
            .dyn_into::<HtmlInputElement>()
            .unwrap();
        document.body().unwrap().append_child(&input).unwrap();
        input.style().set_property("width", "0").unwrap();
        input.style().set_property("height", "0").unwrap();
        let input = Rc::new(input);

        let ctx = canvas
            .get_context("2d")
            .unwrap()
            .unwrap()
            .dyn_into::<CanvasRenderingContext2d>()
            .unwrap();
        ctx.set_font("16px serif");

        let text = Rc::new(RefCell::new(String::new()));

        {
            let input = Rc::clone(&input);
            let on_click = Closure::<dyn FnMut(_)>::new(move |_event: MouseEvent| {
                input.focus().unwrap();
            });
            canvas
                .add_event_listener_with_callback("click", on_click.as_ref().unchecked_ref())
                .unwrap();
            on_click.forget();
        }

        {
            let on_input = Closure::<dyn FnMut(_)>::new(move |event: InputEvent| {
                let target = event
                    .target()
                    .unwrap()
                    .dyn_into::<HtmlInputElement>()
                    .unwrap();
                let value = target.value();
                text.borrow_mut().push_str(&value);
                target.set_value("");

                ctx.clear_rect(0., 0., 640., 480.);
                ctx.fill_text(&text.borrow(), 50., 50.).unwrap();
            });
            input
                .add_event_listener_with_callback("input", on_input.as_ref().unchecked_ref())
                .unwrap();
            on_input.forget();
        }
    }
}
