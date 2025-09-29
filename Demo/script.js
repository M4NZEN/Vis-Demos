const nodes = new vis.DataSet([
  { id: 1, label: "Nota 1" },
  { id: 2, label: "Nota 2" },
  { id: 3, label: "Nota 3" },
  { id: 4, label: "Nota 4" },
  { id: 5, label: "Nota 5" }
]);

const edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 3 }
]);

const container = document.getElementById("mynetwork");

const data = { nodes, edges };
const options = {
  nodes: {
    shape: "dot",
    size: 20,
    color: "#007bff",
    font: { color: "#000" }
  },
  edges: {
    color: { color: "#aaa" },
    arrows: "to"
  },
  physics: {
    stabilization: false
  }
};

const network = new vis.Network(container, data, options);