import { Point, Segment, getIntersection, getRandomColor, average } from "@/js";

class Polygon {
  points: Point[];
  segments: Segment[];
  constructor(points: Point[]) {
    this.points = points;
    this.segments = [];
    for (let i = 1; i <= points.length; i++) {
      this.segments.push(new Segment(points[i - 1], points[i % points.length]));
    }
  }

  static union(polys: Polygon[]) {
    const keptSegments = [];

    for (let i = 0; i < polys.length; i++) {
      for (const segment of polys[i].segments) {
        let keep = true;
        for (let j = 0; j < polys.length; j++) {
          if (i !== j) {
            if (!!polys[j].containsSegment(segment)) {
              keep = false;
              break;
            }
          }
        }
        if (keep) {
          keptSegments.push(segment);
        }
      }
    }

    return keptSegments;
  }

  static multiBreak(polys: Polygon[]) {
    for (let i = 0; i < polys.length - 1; i++) {
      for (let j = i + 1; j < polys.length; j++) {
        Polygon.break(polys[i], polys[j]);
      }
    }
  }

  static break(poly1: Polygon, poly2: Polygon) {
    const segs1 = poly1.segments;
    const segs2 = poly2.segments;
    const intersections = [];
    for (let i = 0; i < segs1.length; i++) {
      for (let j = 0; j < segs2.length; j++) {
        const intersection = getIntersection(
          segs1[i].p1,
          segs1[i].p2,
          segs2[j].p1,
          segs2[j].p2
        );

        if (
          intersection &&
          intersection.offset !== 1 &&
          intersection.offset !== 0
        ) {
          const point = new Point(intersection.x, intersection.y);
          intersections.push(point);
          let aux = segs1[i].p2;
          segs1[i].p2 = point;
          segs1.splice(i + 1, 0, new Segment(point, aux));
          aux = segs2[j].p2;
          segs2[j].p2 = point;
          segs2.splice(j + 1, 0, new Segment(point, aux));
        }
      }
    }
    return intersections;
  }

  containsSegment(segment: Segment) {
    const midpoint = average(segment.p1, segment.p2);
    return this.containsPoint(midpoint);
  }

  containsPoint(point: Point) {
    const outerPoint = new Point(-1000, -1000);
    let intersectionCount = 0;
    for (const segment of this.segments) {
      const intersection = getIntersection(
        outerPoint,
        point,
        segment.p1,
        segment.p2
      );
      if (intersection) {
        intersectionCount++;
      }
    }

    return intersectionCount % 2 === 1;
  }

  drawSegments(ctx: CanvasRenderingContext2D) {
    for (const segment of this.segments) {
      segment.draw(ctx, { color: getRandomColor(), width: 5 });
    }
  }

  draw(
    ctx: CanvasRenderingContext2D,
    { stroke = "blue", lineWidth = 2, fill = "rgba(0,0,255,0.3)" } = {}
  ) {
    ctx.beginPath();
    ctx.fillStyle = fill;
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lineWidth;
    ctx.moveTo(this.points[0].x, this.points[0].y);
    for (let i = 1; i < this.points.length; i++) {
      ctx.lineTo(this.points[i].x, this.points[i].y);
    }
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
}

export { Polygon };
