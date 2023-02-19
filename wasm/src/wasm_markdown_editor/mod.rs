mod models;

use self::models::{CaretIndex, CharInfo, Line, Lines};
use crate::{canvas::line, coordinate::Coordinate};
use std::{cell::RefCell, rc::Rc, time::Duration};
use uuid::Uuid;
use wasm_bindgen::{
    prelude::{wasm_bindgen, Closure},
    JsCast,
};
use wasm_bindgen_futures::spawn_local;
use wasm_timer::Delay;
use web_sys::{
    window, CanvasRenderingContext2d, HtmlCanvasElement, HtmlInputElement, InputEvent,
    KeyboardEvent,
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

        let lines = Rc::new(RefCell::new(Lines::new()));

        let caret_index = Rc::new(RefCell::new(CaretIndex::new()));

        let is_caret_shown = Rc::new(RefCell::new(true));

        let blink_id: Rc<RefCell<Option<Uuid>>> = Rc::new(RefCell::new(None));

        fn render(
            ctx: &CanvasRenderingContext2d,
            lines: &RefCell<Lines>,
            caret_index: &RefCell<CaretIndex>,
            is_caret_shown: &RefCell<bool>,
        ) {
            ctx.clear_rect(0., 0., 640., 480.);

            lines.borrow().0.iter().enumerate().for_each(|(i, l)| {
                let text = l.0.iter().map(|c| c.char).collect::<String>();
                let y = lines.borrow().0[..i].iter().map(|l| l.height()).sum();
                ctx.fill_text(&text, 0., y).unwrap();
            });

            if *is_caret_shown.borrow() {
                let caret_x = lines.borrow().0[caret_index.borrow().row].0
                    [..caret_index.borrow().column]
                    .iter()
                    .map(|c| c.width)
                    .sum();
                let caret_y_start = lines.borrow().0[..caret_index.borrow().row]
                    .iter()
                    .map(|l| l.height())
                    .sum();
                let caret_y_end =
                    caret_y_start + lines.borrow().0[caret_index.borrow().row].height();
                line(
                    &ctx,
                    &Coordinate {
                        x: caret_x,
                        y: caret_y_start,
                    },
                    &Coordinate {
                        x: caret_x,
                        y: caret_y_end,
                    },
                );
            }
        }

        {
            let ctx = Rc::clone(&ctx);
            let lines = Rc::clone(&lines);
            let caret_index = Rc::clone(&caret_index);
            let is_caret_shown = Rc::clone(&is_caret_shown);
            let on_input = Closure::<dyn FnMut(_)>::new(move |event: InputEvent| {
                let value = {
                    let target = event
                        .target()
                        .unwrap()
                        .dyn_into::<HtmlInputElement>()
                        .unwrap();
                    let value = target.value();
                    target.set_value("");
                    value
                };

                {
                    let char = value
                        .chars()
                        .collect::<Vec<char>>()
                        .first()
                        .unwrap()
                        .to_owned();
                    let text_metrics = ctx.measure_text(&char.to_string()).unwrap();
                    lines.borrow_mut().0[caret_index.borrow().row].0.insert(
                        caret_index.borrow().column,
                        CharInfo {
                            char,
                            width: text_metrics.width(),
                        },
                    );

                    caret_index.borrow_mut().column += 1;
                }

                render(&ctx, &lines, &caret_index, &is_caret_shown);
            });
            input
                .add_event_listener_with_callback("input", on_input.as_ref().unchecked_ref())
                .unwrap();
            on_input.forget();
        }

        {
            let ctx = Rc::clone(&ctx);
            let lines = Rc::clone(&lines);
            let caret_index = Rc::clone(&caret_index);
            let is_caret_shown = Rc::clone(&is_caret_shown);
            let blink_id = Rc::clone(&blink_id);
            let on_key_down = Closure::<dyn FnMut(_)>::new(move |event: KeyboardEvent| {
                *is_caret_shown.borrow_mut() = true;
                *blink_id.borrow_mut() = None;

                match event.key().as_str() {
                    "ArrowLeft" => {
                        if caret_index.borrow().column == 0 {
                            if caret_index.borrow().row == 0 {
                                return;
                            }

                            let prev_line_char_infos_len =
                                lines.borrow().0[caret_index.borrow().row - 1].0.len();

                            caret_index.borrow_mut().row -= 1;
                            caret_index.borrow_mut().column = prev_line_char_infos_len;
                        } else {
                            caret_index.borrow_mut().column -= 1;
                        }

                        render(&ctx, &lines, &caret_index, &is_caret_shown);
                    }
                    "ArrowRight" => {
                        if caret_index.borrow().column
                            == lines.borrow().0[caret_index.borrow().row].0.len()
                        {
                            if caret_index.borrow().row == lines.borrow().0.len() - 1 {
                                return;
                            }

                            caret_index.borrow_mut().row += 1;
                            caret_index.borrow_mut().column = 0;
                        } else {
                            caret_index.borrow_mut().column += 1;
                        }

                        render(&ctx, &lines, &caret_index, &is_caret_shown);
                    }
                    "ArrowUp" => {
                        if caret_index.borrow().row == 0 {
                            caret_index.borrow_mut().column = 0;
                        } else {
                            let new_caret_index_column = {
                                let prev_line_char_infos_len =
                                    lines.borrow().0[caret_index.borrow().row - 1].0.len();
                                if caret_index.borrow().column > prev_line_char_infos_len {
                                    prev_line_char_infos_len
                                } else {
                                    caret_index.borrow().column
                                }
                            };

                            caret_index.borrow_mut().row -= 1;
                            caret_index.borrow_mut().column = new_caret_index_column;
                        }

                        render(&ctx, &lines, &caret_index, &is_caret_shown);
                    }
                    "ArrowDown" => {
                        if caret_index.borrow().row == lines.borrow().0.len() - 1 {
                            let end_of_line = lines.borrow().0[caret_index.borrow().row].0.len();
                            caret_index.borrow_mut().column = end_of_line;
                        } else {
                            let new_caret_index_column = {
                                let next_line_char_infos_len =
                                    lines.borrow().0[caret_index.borrow().row + 1].0.len();
                                if caret_index.borrow().column > next_line_char_infos_len {
                                    next_line_char_infos_len
                                } else {
                                    caret_index.borrow().column
                                }
                            };

                            caret_index.borrow_mut().row += 1;
                            caret_index.borrow_mut().column = new_caret_index_column;
                        }

                        render(&ctx, &lines, &caret_index, &is_caret_shown);
                    }
                    "Backspace" => {
                        let prev_caret_index = caret_index.borrow().column - 1;

                        if caret_index.borrow().column == 0 {
                            if caret_index.borrow().row == 0 {
                                return;
                            }

                            let prev_line_char_infos_len =
                                lines.borrow().0[caret_index.borrow().row - 1].0.len();

                            let current_line =
                                lines.borrow_mut().0.remove(caret_index.borrow().row);
                            lines.borrow_mut().0[caret_index.borrow().row - 1]
                                .0
                                .extend(current_line.0);

                            caret_index.borrow_mut().row -= 1;
                            caret_index.borrow_mut().column = prev_line_char_infos_len;
                        } else {
                            lines.borrow_mut().0[caret_index.borrow().row]
                                .0
                                .remove(prev_caret_index);

                            caret_index.borrow_mut().column -= 1;
                        }

                        render(&ctx, &lines, &caret_index, &is_caret_shown);
                    }
                    "Enter" => {
                        let new_line_char_infos = lines.borrow_mut().0[caret_index.borrow().row]
                            .0
                            .split_off(caret_index.borrow().column);
                        lines
                            .borrow_mut()
                            .0
                            .insert(caret_index.borrow().row + 1, Line(new_line_char_infos));

                        caret_index.borrow_mut().row += 1;
                        caret_index.borrow_mut().column = 0;

                        render(&ctx, &lines, &caret_index, &is_caret_shown);
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

        {
            let ctx = Rc::clone(&ctx);
            let lines = Rc::clone(&lines);
            let caret_index = Rc::clone(&caret_index);
            let is_caret_shown = Rc::clone(&is_caret_shown);
            let blink_id = Rc::clone(&blink_id);
            let on_key_up = Closure::<dyn FnMut(_)>::new(move |_event: KeyboardEvent| {
                let ctx = Rc::clone(&ctx);
                let lines = Rc::clone(&lines);
                let caret_index = Rc::clone(&caret_index);
                let is_caret_shown = Rc::clone(&is_caret_shown);
                let blink_id = Rc::clone(&blink_id);
                spawn_local(async move {
                    let new_blink_id = Uuid::new_v4();
                    *blink_id.borrow_mut() = Some(new_blink_id);
                    while (*blink_id.borrow()).is_some()
                        && (*blink_id.borrow()).unwrap() == new_blink_id
                    {
                        Delay::new(Duration::from_millis(500)).await.unwrap();

                        if (*blink_id.borrow()).is_some()
                            && (*blink_id.borrow()).unwrap() == new_blink_id
                        {
                            let new_is_caret_shown = !(*is_caret_shown.borrow());
                            *is_caret_shown.borrow_mut() = new_is_caret_shown;

                            render(&ctx, &lines, &caret_index, &is_caret_shown);
                        }
                    }
                });
            });
            window()
                .unwrap()
                .add_event_listener_with_callback("keyup", on_key_up.as_ref().unchecked_ref())
                .unwrap();
            on_key_up.forget();
        }

        {
            let input = Rc::clone(&input);
            input.focus().unwrap();

            let ctx = Rc::clone(&ctx);
            let lines = Rc::clone(&lines);
            let caret_index = Rc::clone(&caret_index);
            let is_caret_shown = Rc::clone(&is_caret_shown);
            let blink_id = Rc::clone(&blink_id);

            render(&ctx, &lines, &caret_index, &is_caret_shown);

            spawn_local(async move {
                let new_blink_id = Uuid::new_v4();
                *blink_id.borrow_mut() = Some(new_blink_id);
                while (*blink_id.borrow()).is_some()
                    && (*blink_id.borrow()).unwrap() == new_blink_id
                {
                    Delay::new(Duration::from_millis(500)).await.unwrap();

                    if (*blink_id.borrow()).is_some()
                        && (*blink_id.borrow()).unwrap() == new_blink_id
                    {
                        let new_is_caret_shown = !(*is_caret_shown.borrow());
                        *is_caret_shown.borrow_mut() = new_is_caret_shown;

                        render(&ctx, &lines, &caret_index, &is_caret_shown);
                    }
                }
            });
        }
    }
}
