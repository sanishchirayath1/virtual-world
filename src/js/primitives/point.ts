class Point {
  x: number;
  y: number;
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  equals(point: Point) {
    return this.x === point.x && this.y === point.y;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    { size = 18, color = "black", outline = false, fill = false } = {}
  ) {
    const radius = size / 2;
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI);
    ctx.fill();

    if (outline) {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "yellow";
      ctx.arc(this.x, this.y, radius * 0.6, 0, 2 * Math.PI);
      ctx.stroke();
    }

    if (fill) {
      ctx.beginPath();
      ctx.fillStyle = "yellow";
      ctx.arc(this.x, this.y, radius * 0.6, 0, 2 * Math.PI);
      ctx.fill();
    }
  }
}
export { Point };
