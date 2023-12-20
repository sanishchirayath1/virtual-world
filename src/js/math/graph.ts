import { Point, Segment } from "";

class Graph {
  points: Point[];
  segments: Segment[];
  constructor(points: Point[] = [], segments: Segment[] = []) {
    this.points = points;
    this.segments = segments;
  }
  draw(ctx: CanvasRenderingContext2D) {
    for (let segment of this.segments) {
      segment.draw(ctx);
    }

    for (let point of this.points) {
      point.draw(ctx);
    }
  }
}

export { Graph };
