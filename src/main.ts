import "./style.css";
import { Graph, GraphEditor, Viewport, Polygon, Envelope, World } from "@/js";

const myCanvas = document.getElementById("myCanvas")! as HTMLCanvasElement;
const dispostBtn = document.getElementById("dispose")! as HTMLButtonElement;
const saveBtn = document.getElementById("save")! as HTMLButtonElement;
myCanvas.width = 600;
myCanvas.height = 600;
const graphStr = localStorage.getItem("graph");
const graphInfo = graphStr ? JSON.parse(graphStr) : null;
const graph = graphInfo ? Graph.load(graphInfo) : new Graph();
const world = new World(graph);
const viewport = new Viewport(myCanvas);
const graphEditor = new GraphEditor(viewport, graph);

animate();

function animate() {
  viewport.reset();
  graphEditor.display();
  // new Polygon(graph.points).draw(viewport.ctx);
  new Envelope(graph.segments[0], 80, 10).draw(viewport.ctx);
  world.generate();
  world.draw(viewport.ctx);
  requestAnimationFrame(animate);
}

dispostBtn.addEventListener("click", () => {
  graphEditor.dispose();
  localStorage.removeItem("graph");
});

saveBtn.addEventListener("click", () => {
  localStorage.setItem("graph", JSON.stringify(graph));
});
