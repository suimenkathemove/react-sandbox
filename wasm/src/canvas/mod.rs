use crate::coordinate::Coordinate;
use web_sys::CanvasRenderingContext2d;

pub fn line(ctx: &CanvasRenderingContext2d, from: &Coordinate, to: &Coordinate) {
    ctx.begin_path();
    ctx.move_to(from.x, from.y);
    ctx.line_to(to.x, to.y);
    ctx.stroke();
}
