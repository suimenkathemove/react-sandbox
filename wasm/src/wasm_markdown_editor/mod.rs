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
    window, CanvasRenderingContext2d, HtmlCanvasElement, HtmlInputElement, InputEvent,
    KeyboardEvent, MouseEvent,
};

#[wasm_bindgen]
pub struct WasmMarkdownEditor;

#[wasm_bindgen]
impl WasmMarkdownEditor {
    pub fn new() {
        let document = window().unwrap().document().unwrap();

        let canvas = document
            .get_element_by_id("wasm-markdown-editor-canvas")
            .unwrap()
            .dyn_into::<HtmlCanvasElement>()
            .unwrap();
        canvas.set_width(640);
        canvas.set_height(480);

        let input = document
            .get_element_by_id("wasm-markdown-editor-input")
            .unwrap()
            .dyn_into::<HtmlInputElement>()
            .unwrap();
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

        fn render(
            ctx: &CanvasRenderingContext2d,
            char_infos: &Rc<RefCell<Vec<CharInfo>>>,
            caret_index: &Rc<Cell<usize>>,
        ) {
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
            let char_infos = Rc::clone(&char_infos);
            let caret_index = Rc::clone(&caret_index);
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
                    char_infos.borrow_mut().insert(
                        caret_index.get(),
                        CharInfo {
                            char,
                            width: text_metrics.width(),
                        },
                    );

                    caret_index.set(caret_index.get() + 1);
                }

                render(&ctx, &char_infos, &caret_index);
            });
            input
                .add_event_listener_with_callback("input", on_input.as_ref().unchecked_ref())
                .unwrap();
            on_input.forget();
        }

        {
            let ctx = Rc::clone(&ctx);
            let char_infos = Rc::clone(&char_infos);
            let caret_index = Rc::clone(&caret_index);
            let on_key_down = Closure::<dyn FnMut(_)>::new(move |event: KeyboardEvent| {
                match event.key().as_str() {
                    "ArrowLeft" => {
                        let new_caret_index = if caret_index.get() <= 0 {
                            0
                        } else {
                            caret_index.get() - 1
                        };
                        caret_index.set(new_caret_index);

                        render(&ctx, &char_infos, &caret_index);
                    }
                    "ArrowRight" => {
                        let new_caret_index =
                            std::cmp::min(caret_index.get() + 1, char_infos.borrow().len());
                        caret_index.set(new_caret_index);

                        render(&ctx, &char_infos, &caret_index);
                    }
                    "Backspace" => {
                        let prev_caret_index = caret_index.get() - 1;

                        if char_infos.borrow().get(prev_caret_index).is_none() {
                            return;
                        }

                        char_infos.borrow_mut().remove(prev_caret_index);
                        caret_index.set(caret_index.get() - 1);

                        render(&ctx, &char_infos, &caret_index);
                    }
                    _ => {}
                };
            });
            window()
                .unwrap()
                .add_event_listener_with_callback("keydown", on_key_down.as_ref().unchecked_ref())
                .unwrap();
            on_key_down.forget();
        }
    }
}
