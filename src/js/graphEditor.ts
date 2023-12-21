import { Graph, Point, Segment, getNearestPoint } from "@/js";

class GraphEditor {
  private canvas: HTMLCanvasElement;
  private graph: Graph;
  private ctx: CanvasRenderingContext2D;
  private selected: Point | null = null;
  private hovered: Point | null = null;
  private dragging: boolean = false;
  private mouse: Point | null = null;

  constructor(canvas: HTMLCanvasElement, graph: Graph) {
    this.canvas = canvas;
    this.graph = graph;
    this.ctx = canvas.getContext("2d")!;
    this.addEventListeners();
  }

  private addEventListeners() {
    this.canvas.addEventListener("mousedown", this.handleMousedown.bind(this));

    this.canvas.addEventListener("mousemove", this.handleMousemove.bind(this));

    this.canvas.addEventListener("contextmenu", (e) => e.preventDefault());
    this.canvas.addEventListener("mouseup", () => (this.dragging = false));
  }

  private handleMousemove(e: MouseEvent) {
    this.mouse = new Point(e.offsetX, e.offsetY);
    this.hovered = getNearestPoint(this.mouse, this.graph.points, 10);
    if (this.dragging && this.selected) {
      this.selected.x = this.mouse.x;
      this.selected.y = this.mouse.y;
    }
  }

  private handleMousedown(e: MouseEvent) {
    if (e.button === 2) {
      if (this.selected) {
        this.selected = null;
      } else if (this.hovered) {
        this.removePoint(this.hovered);
      }
    } else if (e.button === 0) {
      const point = new Point(e.offsetX, e.offsetY);
      if (this.hovered) {
        this.select(this.hovered);
        this.dragging = true;
        return;
      }
      this.graph.addPoint(point);
      this.select(point);
      this.hovered = point;
    }
  }

  private select(point: Point) {
    if (this.selected) {
      this.graph.tryAddSegment(new Segment(this.selected, point));
    }
    this.selected = point;
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
      const intent = this.hovered ? this.hovered : this.mouse;
      new Segment(this.selected, intent!).draw(this.ctx, { dash: [3, 3] });
      this.selected.draw(this.ctx, { outline: true });
    }
  }
}

export { GraphEditor };
