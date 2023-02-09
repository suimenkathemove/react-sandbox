#[derive(Debug)]
pub struct CharInfo {
    pub char: char,
    pub width: f64,
}

#[derive(Debug)]
pub struct Line(pub Vec<CharInfo>);

impl Line {
    pub fn new() -> Self {
        Self(Vec::new())
    }

    pub fn height(&self) -> f64 {
        16.
    }
}

#[derive(Debug)]
pub struct Lines(pub Vec<Line>);

impl Lines {
    pub fn new() -> Self {
        Self(vec![Line::new()])
    }
}

#[derive(Debug)]
pub struct CaretIndex {
    pub row: usize,
    pub column: usize,
}

impl CaretIndex {
    pub fn new() -> Self {
        Self { row: 0, column: 0 }
    }
}
