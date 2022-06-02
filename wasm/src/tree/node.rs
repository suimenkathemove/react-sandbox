use super::flattened_tree::{create_mock_flattened_tree, FlattenedTreeItem};
use std::{cell::RefCell, rc::Rc};

#[derive(Debug, PartialEq)]
pub struct Node {
    pub id: String,
    pub children: Vec<Rc<RefCell<Node>>>,
}

impl Node {
    pub fn flatten_tree(&self) -> Vec<FlattenedTreeItem> {
        let mut flattened_tree = Vec::<FlattenedTreeItem>::new();

        fn flatten(
            flattened_tree: &mut Vec<FlattenedTreeItem>,
            node: Rc<RefCell<Node>>,
            parent_id: String,
            depth: usize,
        ) {
            flattened_tree.push(FlattenedTreeItem {
                id: node.borrow().id.to_string(),
                parent_id,
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
        self.children.iter().for_each(|c| {
            flatten(&mut flattened_tree, Rc::clone(c), self.id.to_string(), 0);
        });

        flattened_tree
    }
}

pub fn create_mock_node() -> Node {
    Node {
        id: "root".to_string(),
        children: vec![
            Rc::new(RefCell::new(Node {
                id: "1".to_string(),
                children: vec![
                    Rc::new(RefCell::new(Node {
                        id: "4".to_string(),
                        children: vec![
                            Rc::new(RefCell::new(Node {
                                id: "10".to_string(),
                                children: vec![],
                            })),
                            Rc::new(RefCell::new(Node {
                                id: "11".to_string(),
                                children: vec![],
                            })),
                            Rc::new(RefCell::new(Node {
                                id: "12".to_string(),
                                children: vec![],
                            })),
                        ],
                    })),
                    Rc::new(RefCell::new(Node {
                        id: "5".to_string(),
                        children: vec![],
                    })),
                    Rc::new(RefCell::new(Node {
                        id: "6".to_string(),
                        children: vec![],
                    })),
                ],
            })),
            Rc::new(RefCell::new(Node {
                id: "2".to_string(),
                children: vec![
                    Rc::new(RefCell::new(Node {
                        id: "7".to_string(),
                        children: vec![],
                    })),
                    Rc::new(RefCell::new(Node {
                        id: "8".to_string(),
                        children: vec![],
                    })),
                    Rc::new(RefCell::new(Node {
                        id: "9".to_string(),
                        children: vec![],
                    })),
                ],
            })),
            Rc::new(RefCell::new(Node {
                id: "3".to_string(),
                children: vec![],
            })),
        ],
    }
}

#[test]
fn test_flatten_tree() {
    let flattened_tree = create_mock_flattened_tree();
    let node = create_mock_node();

    assert_eq!(flattened_tree, node.flatten_tree());
}
