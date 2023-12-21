import { Point, substract, add, scale } from "@/js";

class Viewport {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  zoom: number;
  drag: any;
  center: Point;
  offset: Point;
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;
    this.zoom = 1;
    this.center = new Point(canvas.width / 2, canvas.height / 2);
    this.offset = scale(this.center, -1);
    this.drag = {
      start: new Point(0, 0),
      end: new Point(0, 0),
      offset: new Point(0, 0),
      active: false,
    };
    this.addEventListeners();
  }

  reset() {
    this.ctx.restore();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.save();
    this.ctx.translate(this.center.x, this.center.y);
    this.ctx.scale(1 / this.zoom, 1 / this.zoom);
    const offset = this.getOffset();
    this.ctx.translate(offset.x, offset.y);
  }

  getMouse(e: MouseEvent, subtractDragOffset = false) {
    const p = new Point(
      (e.offsetX - this.center.x) * this.zoom - this.offset.x,
      (e.offsetY - this.center.y) * this.zoom - this.offset.y
    );
    return subtractDragOffset ? substract(p, this.drag.offset) : p;
  }

  private addEventListeners() {
    this.canvas.addEventListener("wheel", this.handleMouseWheel.bind(this));
    this.canvas.addEventListener("mousedown", this.handleMousedown.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMousemove.bind(this));
    this.canvas.addEventListener("mouseup", this.handleMouseup.bind(this));
  }

  private handleMouseWheel(e: WheelEvent) {
    const dir = Math.sign(e.deltaY);
    const step = 0.1;
    this.zoom += dir * step;
    this.zoom = Math.max(1, Math.min(5, this.zoom));
  }

  private handleMousedown(e: MouseEvent) {
    if (e.button === 1) {
      // Middle mouse button
      this.drag.start = this.getMouse(e);
      this.drag.active = true;
    }
  }

  private handleMousemove(e: MouseEvent) {
    if (this.drag.active) {
      this.drag.end = this.getMouse(e);
      this.drag.offset = substract(this.drag.end, this.drag.start);
    }
  }

  private handleMouseup() {
    if (this.drag.active) {
      this.offset = add(this.offset, this.drag.offset);
      this.drag = {
        start: new Point(0, 0),
        end: new Point(0, 0),
        offset: new Point(0, 0),
        active: false,
      };
    }
  }

  getOffset() {
    return add(this.offset, this.drag.offset);
  }
}

export { Viewport };
