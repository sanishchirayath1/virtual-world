import "./style.css";
import { Graph, Point, Segment } from "@/js/index";

const myCanvas = document.getElementById("myCanvas")! as HTMLCanvasElement;
myCanvas.width = 600;
myCanvas.height = 600;

let ctx = myCanvas.getContext("2d")!;
const p1 = new Point(100, 100);
const p2 = new Point(200, 200);
const p3 = new Point(300, 300);
const p4 = new Point(400, 400);

const s1 = new Segment(p1, p2);
const s2 = new Segment(p2, p3);
const s3 = new Segment(p3, p4);
const s4 = new Segment(p4, p1);

const graph = new Graph([p1, p2, p3, p4], [s1, s2, s3, s4]);
graph.draw(ctx);
