mod char_info;

use self::char_info::CharInfo;
use crate::{canvas::line, coordinate::Coordinate};
use std::{
    cell::{Cell, RefCell},
    rc::Rc,
};
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
        ctx.set_text_baseline("top");
        let ctx = Rc::new(ctx);

        let char_infos = Rc::new(RefCell::new(Vec::<CharInfo>::new()));

        let caret_index = Rc::new(Cell::new(0usize));

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
            let ctx = Rc::clone(&ctx);
            let on_input = Closure::<dyn FnMut(_)>::new(move |event: InputEvent| {
                let target = event
                    .target()
                    .unwrap()
                    .dyn_into::<HtmlInputElement>()
                    .unwrap();

                let value = target.value();
                target.set_value("");

                {
                    let char = value
                        .chars()
                        .collect::<Vec<char>>()
                        .first()
                        .unwrap()
                        .to_owned();
                    let text_metrics = ctx.measure_text(&char.to_string()).unwrap();
                    char_infos.borrow_mut().push(CharInfo {
                        char,
                        width: text_metrics.width(),
                    });

                    caret_index.set(caret_index.get() + 1);
                }

                {
                    ctx.clear_rect(0., 0., 640., 480.);

                    let text = char_infos
                        .borrow()
                        .iter()
                        .map(|c| c.char)
                        .collect::<String>();
                    ctx.fill_text(&text, 0., 0.).unwrap();

                    let caret_x = char_infos.borrow()[0..caret_index.get()]
                        .into_iter()
                        .map(|c| c.width)
                        .sum();
                    line(
                        &ctx,
                        &Coordinate { x: caret_x, y: 0. },
                        &Coordinate { x: caret_x, y: 16. },
                    );
                }
            });
            input
                .add_event_listener_with_callback("input", on_input.as_ref().unchecked_ref())
                .unwrap();
            on_input.forget();
        }
    }
}
