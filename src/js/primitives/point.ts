class Point {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }
  draw(ctx: CanvasRenderingContext2D) {}
}
export { Point };
