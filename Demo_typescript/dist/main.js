// src/main.ts
// Default import para Network, named import para DataSet
import { Network } from "vis-network/standalone";
import { DataSet } from "vis-data/standalone";
// Datos iniciales
const nodes = new DataSet([
    { id: 1, label: "Nodo 1" },
    { id: 2, label: "Nodo 2" },
    { id: 3, label: "Nodo 3" }
]);
const edges = new DataSet([
    { from: 1, to: 2 },
    { from: 1, to: 3 }
]);
// Configuración del contenedor y red
const container = document.getElementById("mynetwork");
if (!container)
    throw new Error("No se encontró el contenedor #mynetwork");
const data = { nodes, edges };
const options = {
    nodes: { shape: "dot", size: 16 },
    edges: { color: "#4b2525ff" },
    physics: { enabled: true }
};
// Crear la red
const network = new Network(container, data, options);
