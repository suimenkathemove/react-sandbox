use super::node::Node;
use serde::{Deserialize, Serialize};
use std::{cell::RefCell, collections::HashMap, rc::Rc};
use wasm_bindgen::prelude::*;

#[derive(Debug, PartialEq, Serialize, Deserialize)]
pub struct FlattenedTreeItem {
    pub id: String,
    pub parentId: String,
    pub depth: usize,
    pub isLeaf: bool,
    pub collapsed: bool,
}

#[wasm_bindgen]
pub fn finder_build_tree(val: &JsValue) -> JsValue {
    let flattened_tree: Vec<FlattenedTreeItem> = val.into_serde().unwrap();

    let tree = Rc::new(RefCell::new(Node {
        id: "root".to_string(),
        children: vec![],
        isLeaf: false,
        collapsed: true,
    }));
    let mut map = HashMap::from([(tree.borrow().id.to_string(), Rc::clone(&tree))]);

    flattened_tree.iter().for_each(|item| {
        if !map.contains_key(&item.parentId) {
            let node = Rc::new(RefCell::new(Node {
                id: item.parentId.to_string(),
                children: vec![],
                isLeaf: item.isLeaf,
                collapsed: item.collapsed,
            }));
            map.insert(item.parentId.to_string(), node);
        }

        if !map.contains_key(&item.id) {
            let node = Rc::new(RefCell::new(Node {
                id: item.id.to_string(),
                children: vec![],
                isLeaf: item.isLeaf,
                collapsed: item.collapsed,
            }));
            map.insert(item.id.to_string(), node);
        }

        let parent = map.get(&item.parentId).unwrap();
        let node = map.get(&item.id).unwrap();
        parent.borrow_mut().children.push(Rc::clone(node));
    });

    JsValue::from_serde(&tree).unwrap()
}
