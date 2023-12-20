import { Point, Segment } from "@/js";

class Graph {
  points: Point[];
  segments: Segment[];
  constructor(points: Point[] = [], segments: Segment[] = []) {
    this.points = points;
    this.segments = segments;
  }

  private addPoint(point: Point) {
    this.points.push(point);
  }

  containsPoint(point: Point) {
    return this.points.some((p) => p.equals(point));
  }

  tryAddPoint(point: Point) {
    if (!this.containsPoint(point)) {
      this.addPoint(point);
      return true;
    }

    return false;
  }

  private addSegment(segment: Segment) {
    this.segments.push(segment);
  }

  containsSegment(segment: Segment) {
    return this.segments.some((s) => s.equals(segment));
  }

  tryAddSegment(segment: Segment) {
    if (!this.containsSegment(segment)) {
      this.addSegment(segment);
      return true;
    }

    return false;
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
