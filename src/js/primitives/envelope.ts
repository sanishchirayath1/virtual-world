import { Polygon, Segment, translate, angle } from "@/js";

class Envelope {
  skeleton: Segment;
  poly: Polygon;
  constructor(skeleton: Segment, width: number, roundness = 1) {
    this.skeleton = skeleton;
    this.poly = this.generatePolygon(width, roundness);
  }

  private generatePolygon(width: number, roundness: number) {
    const { p1, p2 } = this.skeleton;
    const radius = width / 2;
    const alpha = angle(p1, p2); // Angle of the skeleton
    const alpha_cw = alpha - Math.PI / 2; // Angle of the skeleton + 90°
    const alpha_ccw = alpha + Math.PI / 2; // Angle of the skeleton - 90°

    const points = [];
    const step = Math.PI / Math.max(1, roundness);
    const eps = step / 2;
    for (let i = alpha_cw; i <= alpha_ccw + eps; i += step) {
      points.push(translate(p1, i, radius));
    }
    for (let i = alpha_cw; i <= alpha_ccw + eps; i += step) {
      points.push(translate(p2, Math.PI + i, radius));
    }

    return new Polygon(points);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.poly.draw(ctx);
    this.poly.drawSegments(ctx);
  }
}

export { Envelope };
