import { Graph, Envelope, Polygon, Point, Segment } from "@/js";

class World {
  graph: Graph;
  roadWidth: number;
  roadRoundness: number;
  envelopes: Envelope[];
  intersections: Point[];
  roadBorders: Segment[];
  constructor(graph: Graph, roadWidth = 80, roadRoundness = 10) {
    this.graph = graph;
    this.roadWidth = roadWidth;
    this.roadRoundness = roadRoundness;
    this.envelopes = [];
    this.intersections = [];
    this.roadBorders = [];
    this.generate();
  }

  generate() {
    this.envelopes.length = 0;
    for (const segment of this.graph.segments) {
      this.envelopes.push(
        new Envelope(segment, this.roadWidth, this.roadRoundness)
      );
    }

    this.roadBorders = Polygon.union(this.envelopes.map((e) => e.poly));
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (const envelope of this.envelopes) {
      envelope.draw(ctx);
    }

    // for (const segment of this.roadBorders) {
    //   segment.draw(ctx, { color: "white", width: 4 });
    // }
  }
}
export { World };
