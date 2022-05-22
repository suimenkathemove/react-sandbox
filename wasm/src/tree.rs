use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct Node {
    id: String,
    children: Vec<Node>,
}

#[wasm_bindgen]
impl Node {
    pub fn new(val: &JsValue) -> Self {
        let node: Node = val.into_serde().unwrap();
        node
    }

    pub fn flatten_tree(&self) -> JsValue {
        let mut flattened_tree = Vec::<FlattenedTreeItem>::new();

        fn flatten(
            flattened_tree: &mut Vec<FlattenedTreeItem>,
            node: &Node,
            parent_id: String,
            depth: usize,
        ) {
            flattened_tree.push(FlattenedTreeItem {
                id: node.id.to_string(),
                parent_id,
                depth,
            });

            node.children.iter().for_each(|n| {
                flatten(flattened_tree, n, node.id.to_string(), depth + 1);
            });
        }
        self.children.iter().for_each(|c| {
            flatten(&mut flattened_tree, c, self.id.to_string(), 0);
        });

        JsValue::from_serde(&flattened_tree).unwrap()
    }
}

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct FlattenedTreeItem {
    id: String,
    parent_id: String,
    depth: usize,
}
