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

function average(p1: Point, p2: Point) {
  return new Point((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
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

function translate(p: Point, angle: number, offset: number) {
  return new Point(
    p.x + offset * Math.cos(angle),
    p.y + offset * Math.sin(angle)
  );
}

function angle(p1: Point, p2: Point) {
  return Math.atan2(p1.y - p2.y, p1.x - p2.x);
}

function getIntersection(A: Point, B: Point, C: Point, D: Point) {
  const tTop = (D.x - C.x) * (A.y - C.y) - (D.y - C.y) * (A.x - C.x);
  const uTop = (C.y - A.y) * (A.x - B.x) - (C.x - A.x) * (A.y - B.y);
  const bot = (D.y - C.y) * (B.x - A.x) - (D.x - C.x) * (B.y - A.y);

  if (bot != 0) {
    const t = tTop / bot;
    const u = uTop / bot;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(A.x, B.x, t),
        y: lerp(A.y, B.y, t),
        offset: t,
      };
    }
  }

  return null;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function getRandomColor() {
  const hue = 290 + Math.random() * 260;
  return `hsl(${hue}, 100%, 50%)`;
}

export {
  getNearestPoint,
  distance,
  substract,
  add,
  scale,
  translate,
  angle,
  getIntersection,
  lerp,
  getRandomColor,
  average,
};
