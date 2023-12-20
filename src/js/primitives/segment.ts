import { Point } from "./point";

class Segment {
  p1: Point;
  p2: Point;
  constructor(p1: Point, p2: Point) {
    this.p1 = p1;
    this.p2 = p2;
  }
  draw(ctx: CanvasRenderingContext2D) {}
}
export { Segment };
