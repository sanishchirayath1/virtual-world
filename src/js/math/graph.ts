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

  removePoint(point: Point) {
    const segments = this.segments.filter((s) => s.includes(point));
    this.points.splice(this.points.indexOf(point), 1);
    segments.forEach((s) => this.removeSegment(s));
  }

  private addSegment(segment: Segment) {
    this.segments.push(segment);
  }

  containsSegment(segment: Segment) {
    return this.segments.some((s) => s.equals(segment));
  }

  tryAddSegment(segment: Segment) {
    if (!this.containsSegment(segment) && !segment.p1.equals(segment.p2)) {
      this.addSegment(segment);
      return true;
    }

    return false;
  }

  removeSegment(segment: Segment) {
    this.segments.splice(this.segments.indexOf(segment), 1);
  }

  dispose() {
    /*
    * This method is used to clear the graph.
    * You'll be wondering why can't we just do this.points = [] and this.segments = [].
    * The reason is that we want to clear the array in-place.
    * If we do this.points = [], we are creating a new array and assigning it to this.points.
    * The old array is still in memory and will be garbage collected later.
    * If we do this.points.length = 0, we are clearing the array in-place.
    */
    this.points.length = 0;
    this.segments.length = 0;
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
