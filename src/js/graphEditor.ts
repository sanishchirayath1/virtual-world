import { Graph, Point, getNearestPoint } from "@/js";

class GraphEditor {
  private canvas: HTMLCanvasElement;
  private graph: Graph;
  private ctx: CanvasRenderingContext2D;
  private selected: Point | null = null;
  private hovered: Point | null = null;
  private dragging: boolean = false;

  constructor(canvas: HTMLCanvasElement, graph: Graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.ctx = canvas.getContext("2d")!;
    this.addEventListeners();
  }

  private addEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      if (e.button === 2) {
        if (this.hovered) {
          this.removePoint(this.hovered);
          return;
        }
      } else if (e.button === 0) {
        const point = new Point(e.offsetX, e.offsetY);
        if (this.hovered) {
          this.selected = this.hovered;
          this.dragging = true;
          return;
        }
        this.selected = point;
        this.hovered = point;
        this.graph.tryAddPoint(point);
      }
    });

    this.canvas.addEventListener("mousemove", (e) => {
      const point = new Point(e.offsetX, e.offsetY);
      this.hovered = getNearestPoint(point, this.graph.points, 10);
      if (this.dragging && this.selected) {
        this.selected.x = e.offsetX;
        this.selected.y = e.offsetY;
      }
    });

    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("mouseup", () => (this.dragging = false));
  }

  private removePoint(point: Point) {
    this.graph.removePoint(point);
    if (this.selected === point) {
      this.selected = null;
    }
    this.hovered = null;
  }

  display() {
    this.graph.draw(this.ctx);
    if (this.hovered) {
      this.hovered.draw(this.ctx, { fill: true });
    }

    if (this.selected) {
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}

export { GraphEditor };
