import "./style.css";
import { Graph, Point, Segment } from "@/js";

const myCanvas = document.getElementById("myCanvas")! as HTMLCanvasElement;
const addPointButton = document.getElementById(
  "addPointButton"
)! as HTMLButtonElement;
const addRandomSegmentButton = document.getElementById(
  "addRandomSegmentButton"
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
  graph.draw(ctx);
}

addPointButton.addEventListener("click", addRandomPoint);
addRandomSegmentButton.addEventListener("click", addRandomSegment);
