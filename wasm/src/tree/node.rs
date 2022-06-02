use super::flattened_tree::FlattenedTreeItem;
use serde::{Deserialize, Serialize};
use std::{cell::RefCell, rc::Rc};
use wasm_bindgen::prelude::*;

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct Node {
    pub id: String,
    pub children: Vec<Rc<RefCell<Node>>>,
}

#[wasm_bindgen]
pub fn flatten_tree(val: &JsValue) -> JsValue {
    let tree: Node = val.into_serde().unwrap();

    let mut flattened_tree = Vec::<FlattenedTreeItem>::new();

    fn flatten(
        flattened_tree: &mut Vec<FlattenedTreeItem>,
        node: Rc<RefCell<Node>>,
        parentId: String,
        depth: usize,
    ) {
        flattened_tree.push(FlattenedTreeItem {
            id: node.borrow().id.to_string(),
            parentId,
            depth,
        });

        node.borrow().children.iter().for_each(|c| {
            flatten(
                flattened_tree,
                Rc::clone(c),
                node.borrow().id.to_string(),
                depth + 1,
            );
        });
    }
    tree.children.iter().for_each(|c| {
        flatten(&mut flattened_tree, Rc::clone(c), tree.id.to_string(), 0);
    });

    JsValue::from_serde(&flattened_tree).unwrap()
}
