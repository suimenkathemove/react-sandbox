# WASM Markdown Editor

- [WASM Markdown Editor](#wasm-markdown-editor)
  - [Overview](#overview)
  - [TODO](#todo)
    - [Design](#design)

## Overview

Markdown WYSIWYG Editor using Rust, WebAssembly & Canvas API.

Storybook URL: <http://react-sandbox-storybook.s3-website-ap-northeast-1.amazonaws.com/main/?path=/story/components-wasm-wasm-markdown-editor--default>

## TODO

- [ ] caret
  - [ ] focus
  - [x] blinking
  - [ ] move
    - [x] keyboard
      - [x] left, right
        - [x] left, right
        - [x] beginning of line, end of line
      - [x] up, down
        - [x] up, down
        - [x] first line, last line
    - [ ] mouse
- [x] backspace
  - [x] delete character
  - [x] beginning of line
- [x] enter
- [ ] folding
- [ ] selection
  - [ ] keyboard
    - [ ] cmd + a => select all
  - [ ] mouse
- [ ] history

### Design

- [ ] controller
- [ ] state, render
