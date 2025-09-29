const nodes = new vis.DataSet([
  { id: 1, label: "Nota 1" },
  { id: 2, label: "Nota 2" },
  { id: 3, label: "Nota 3" },
  { id: 4, label: "Nota 4" },
  { id: 5, label: "Nota 5" },
  { id: 6, label: "Nota 6" },
  { id: 7, label: "Nota 7" },
  { id: 8, label: "Nota 8" }
]);

const edges = new vis.DataSet([
  { from: 1, to: 3 },
  { from: 1, to: 2 },
  { from: 2, to: 4 },
  { from: 2, to: 5 },
  { from: 3, to: 2 }
]);

const container = document.getElementById("mynetwork");

const data = { nodes, edges };
const options = {
  nodes: {
    shape: "dot",
    size: 20,
    color: "#007bff",
    font: { color: "#f1ebebff" }
  },
  edges: {
    color: { color: "#aaa" },
    arrows: "to"
  },
  physics: {
    stabilization: false, 
    barnesHut: {
      gravitationalConstant: -8000,
    },
    minVelocity: 0.1,
    solver: 'barnesHut'
  }
};

const network = new vis.Network(container, data, options);