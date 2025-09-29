// src/main.ts

import { Network } from "vis-network/standalone";
import { DataSet } from "vis-data/standalone";
import type { Node, Edge } from "vis-network/standalone";

// Extender los tipos base de vis-network
interface VisNode extends Node {
  id: number;
  label: string;
}

interface VisEdge extends Edge {
  id: string | number;
  from: number;
  to: number;
}

// Datos iniciales (mapa mental de un curso)
const nodes = new DataSet<VisNode>([
  { id: 1, label: "Mecatrónica" },

  // Temas principales
  { id: 2, label: "Tema 1: Electrónica" },
  { id: 3, label: "Tema 2: Programación" },
  { id: 4, label: "Tema 3: Control" },
  { id: 5, label: "Tema 4: Mecánica" },
  { id: 6, label: "Tema 5: Comunicaciones" },

  // Notas (20+)
  { id: 7, label: "Ley de Ohm" },
  { id: 8, label: "Circuitos RC" },
  { id: 9, label: "Transistores" },
  { id: 10, label: "Arduino" },
  { id: 11, label: "Python" },
  { id: 12, label: "C++" },
  { id: 13, label: "PID" },
  { id: 14, label: "Control Difuso" },
  { id: 15, label: "Motores DC" },
  { id: 16, label: "Motores Paso a Paso" },
  { id: 17, label: "Sensores IR" },
  { id: 18, label: "Sensores Ultrasónicos" },
  { id: 19, label: "PLC" },
  { id: 20, label: "SolidWorks" },
  { id: 21, label: "CAD 3D" },
  { id: 22, label: "Impresión 3D" },
  { id: 23, label: "ROS (Robotics OS)" },
  { id: 24, label: "CAN Bus" },
  { id: 25, label: "Bluetooth" },
  { id: 26, label: "IoT" }
]);

const edges = new DataSet<VisEdge>([
  // Conexiones desde el curso a los temas principales
  { id: "e1-2", from: 1, to: 2, arrows: "to" },
  { id: "e1-3", from: 1, to: 3, arrows: "to" },
  { id: "e1-4", from: 1, to: 4, arrows: "to" },
  { id: "e1-5", from: 1, to: 5, arrows: "to" },
  { id: "e1-6", from: 1, to: 6, arrows: "to" },

  // Electrónica
  { id: "e2-7", from: 2, to: 7, arrows: "to" },
  { id: "e2-8", from: 2, to: 8, arrows: "to" },
  { id: "e2-9", from: 2, to: 9, arrows: "to" },
  { id: "e2-15", from: 2, to: 15, arrows: "to" },
  { id: "e2-16", from: 2, to: 16, arrows: "to" },
  { id: "e2-17", from: 2, to: 17, arrows: "to" },
  { id: "e2-18", from: 2, to: 18, arrows: "to" },

  // Programación
  { id: "e3-10", from: 3, to: 10, arrows: "to" },
  { id: "e3-11", from: 3, to: 11, arrows: "to" },
  { id: "e3-12", from: 3, to: 12, arrows: "to" },
  { id: "e3-23", from: 3, to: 23, arrows: "to" },
  { id: "e3-26", from: 3, to: 26, arrows: "to" },

  // Control
  { id: "e4-13", from: 4, to: 13, arrows: "to" },
  { id: "e4-14", from: 4, to: 14, arrows: "to" },
  { id: "e4-19", from: 4, to: 19, arrows: "to" },

  // Mecánica
  { id: "e5-20", from: 5, to: 20, arrows: "to" },
  { id: "e5-21", from: 5, to: 21, arrows: "to" },
  { id: "e5-22", from: 5, to: 22, arrows: "to" },

  // Comunicaciones
  { id: "e6-24", from: 6, to: 24, arrows: "to" },
  { id: "e6-25", from: 6, to: 25, arrows: "to" },
  { id: "e6-26", from: 6, to: 26, arrows: "to" },

  // Conexiones cruzadas (una bidireccional)
  { id: "e10-11", from: 10, to: 11, arrows: "to, from" }, // Arduino ↔ Python
  { id: "e10-12", from: 10, to: 12, arrows: "to" },
  { id: "e15-13", from: 15, to: 13, arrows: "to" },
  { id: "e16-14", from: 16, to: 14, arrows: "to" },
  { id: "e20-22", from: 20, to: 22, arrows: "to" },
  { id: "e23-26", from: 23, to: 26, arrows: "to" }
]);

// --- Data para la red ---
const data = { nodes, edges };

// Configuración del contenedor y red
const container = document.getElementById("mynetwork");
if (!container) throw new Error("No se encontró el contenedor #mynetwork");

const options = {
  nodes: {
    shape: "dot",
    size: 18,
    color: {
      background: "#888",
      border: "#444",
      highlight: {
        background: "#4ade80",
        border: "#22c55e"
      }
    },
    font: { color: "#eee", size: 14 }
  },
  edges: {
    color: { 
      color: "#3a3a3a",
      highlight: "#4ade80"
    },
    width: 4,
    arrows: { to: { enabled: true, scaleFactor: 1 } },
    smooth: { type: "continuous" }
  },
  physics: {
    stabilization: false,
    barnesHut: { 
      springLength: 120,
      gravitationalConstant: -2000
    }
  },
  interaction: { hover: true }
};

const network = new Network(container, data, options);

// --- Animación de flujo con dashes ---
let offset = 0;
let activeNode: number | null = null;

// Intervalo para animar dashes (flujo continuo)
setInterval(() => {
  if (activeNode !== null) {
    offset = (offset + 1) % 30;

    const connectedEdges = network.getConnectedEdges(activeNode);
    connectedEdges.forEach(edgeId => {
      const edge = edges.get(edgeId);

      if (edge) {
        // Verificar si es bidireccional
        const arrowsStr = typeof edge.arrows === 'string' ? edge.arrows : '';
        const isBidirectional = arrowsStr.includes("from") && arrowsStr.includes("to");
        
        if (isBidirectional) {
          // Aristas bidireccionales no tienen flujo
          edges.update({
            id: edgeId,
            dashes: false,
            color: { color: "#4ade80" },
            width: 5
          });
          return;
        }

        // Determinar dirección del flujo
        const isOutgoing = edge.from === activeNode;

        // Flujo con dashes animados
        if (isOutgoing) {
          // Flujo saliendo (dirección normal)
          edges.update({
            id: edgeId,
            dashes: [4, 4, offset % 30],
            color: { color: "#4ade80" },
            width: 3
          });
        } else {
          // Flujo entrando (dirección invertida)
          edges.update({
            id: edgeId,
            dashes: [10, 10, (30 - offset) % 30],
            color: { color: "#4ade80" },
            width: 3
          });
        }
      }
    });
  }
}, 50);

// Activar flujo al pasar el mouse
network.on("hoverNode", params => {
  activeNode = params.node;
  
  // Colorear nodo activo y conectados
  nodes.update({
    id: params.node,
    color: {
      background: "#4ade80",
      border: "#22c55e"
    }
  });

  const connectedNodes = network.getConnectedNodes(params.node) as number[];
  connectedNodes.forEach(nodeId => {
    nodes.update({
      id: nodeId,
      color: {
        background: "#4ade80",
        border: "#22c55e"
      }
    });
  });
});

// Resetear al salir del nodo
network.on("blurNode", () => {
  activeNode = null;
  
  // Resetear aristas
  const allEdges = edges.get();
  allEdges.forEach(edge => {
    edges.update({
      id: edge.id,
      dashes: false,
      color: { color: "#3a3a3a" },
      width: 4
    });
  });

  // Resetear nodos
  const allNodes = nodes.get();
  allNodes.forEach(node => {
    nodes.update({
      id: node.id,
      color: {
        background: "#888",
        border: "#444"
      }
    });
  });
});