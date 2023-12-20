import "./style.css";
import { Graph, Point, Segment } from "@/js";

const myCanvas = document.getElementById("myCanvas")! as HTMLCanvasElement;
const addPointButton = document.getElementById(
  "addPointButton"
)! as HTMLButtonElement;
const addRandomSegmentButton = document.getElementById(
  "addRandomSegmentButton"
)! as HTMLButtonElement;
const removeSegmentButton = document.getElementById(
  "removeSegmentButton"
)! as HTMLButtonElement;
const removePointButton = document.getElementById(
  "removePointButton"
)! as HTMLButtonElement;

const clearButton = document.getElementById(
  "clearButton"
)! as HTMLButtonElement;
myCanvas.width = 600;
myCanvas.height = 600;

let ctx = myCanvas.getContext("2d")!;
const p1 = new Point(100, 100);
const p2 = new Point(500, 200);
const p3 = new Point(300, 100);
const p4 = new Point(400, 400);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p2, p3);
const s3 = new Segment(p3, p4);
const s4 = new Segment(p4, p1);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
graph.draw(ctx);

function addRandomPoint() {
  const x = Math.random() * ctx.canvas.width;
  const y = Math.random() * ctx.canvas.height;
  graph.tryAddPoint(new Point(x, y));
  graph.draw(ctx);
}

function addRandomSegment() {
  const points = graph.points;
  const p1 = points[Math.floor(Math.random() * points.length)];
  const p2 = points[Math.floor(Math.random() * points.length)];
  const segment = new Segment(p1, p2);
  let success = graph.tryAddSegment(segment);
  console.log(success);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  graph.draw(ctx);
}

function removeSegment() {
  const segments = graph.segments;

  if (segments.length === 0) {
    console.log("No segments to remove");
    return;
  }

  const segment = segments[Math.floor(Math.random() * segments.length)];
  console.log(segment);
  graph.removeSegment(segment);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  graph.draw(ctx);
}

function removePoint() {
  const points = graph.points;

  if (points.length === 0) {
    console.log("No points to remove");
    return;
  }

  const point = points[Math.floor(Math.random() * points.length)];
  console.log(point);
  graph.removePoint(point);
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  graph.draw(ctx);
}

function clear() {
  graph.dispose();
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
}

addPointButton.addEventListener("click", addRandomPoint);
addRandomSegmentButton.addEventListener("click", addRandomSegment);
removeSegmentButton.addEventListener("click", removeSegment);
removePointButton.addEventListener("click", removePoint);
clearButton.addEventListener("click", clear);
