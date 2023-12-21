import { Point } from "@/js";

function getNearestPoint(
  loc: Point,
  points: Point[],
  threshold = Number.MAX_SAFE_INTEGER
) {
  let minDistance = Number.MAX_SAFE_INTEGER;
  let nearest = null;

  for (const point of points) {
    const dist = distance(loc, point);
    if (dist < minDistance && dist < threshold) {
      minDistance = dist;
      nearest = point;
    }
  }

  return nearest;
}

function distance(p1: Point, p2: Point) {
  return Math.hypot(p1.x - p2.x, p1.y - p2.y);
}

function substract(p1: Point, p2: Point) {
  return new Point(p1.x - p2.x, p1.y - p2.y);
}

function add(p1: Point, p2: Point) {
  return new Point(p1.x + p2.x, p1.y + p2.y);
}

function scale(p: Point, factor: number) {
  return new Point(p.x * factor, p.y * factor);
}

export { getNearestPoint, distance, substract, add, scale };
