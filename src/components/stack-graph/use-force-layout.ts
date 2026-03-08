"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  forceSimulation,
  forceCenter,
  forceManyBody,
  forceLink,
  forceCollide,
  forceX,
  forceY,
} from "d3-force";
import type { Simulation, SimulationNodeDatum, SimulationLinkDatum } from "d3-force";
import type { GraphNode, GraphEdge, ExperienceLevel } from "@/types/stack-graph";

export type SimNode = GraphNode &
  SimulationNodeDatum & {
    x: number;
    y: number;
    vx: number;
    vy: number;
  };

type SimEdge = SimulationLinkDatum<SimNode> & {
  source: string | SimNode;
  target: string | SimNode;
};

// Collision radius per level — circle radius + spacing
export const COLLIDE_RADIUS: Record<ExperienceLevel, number> = {
  Expert: 40,
  Avancé: 32,
  Intermédiaire: 26,
  Notions: 20,
};

export function useForceLayout(
  nodes: GraphNode[],
  edges: GraphEdge[],
  width: number,
  height: number,
) {
  const [positions, setPositions] = useState<SimNode[]>([]);
  const simRef = useRef<Simulation<SimNode, SimEdge> | null>(null);
  const nodesRef = useRef<SimNode[]>([]);
  const initRef = useRef(false);

  useEffect(() => {
    if (width <= 0 || height <= 0 || nodes.length === 0) return;
    if (initRef.current) return;
    initRef.current = true;

    const simNodes: SimNode[] = nodes.map((n) => ({
      ...n,
      x: width / 2 + (Math.random() - 0.5) * width * 0.6,
      y: height / 2 + (Math.random() - 0.5) * height * 0.6,
      vx: 0,
      vy: 0,
    }));
    nodesRef.current = simNodes;

    const simEdges: SimEdge[] = edges.map((e) => ({
      source: e.source,
      target: e.target,
    }));

    const sim = forceSimulation<SimNode>(simNodes)
      .force("center", forceCenter(width / 2, height / 2))
      .force("charge", forceManyBody<SimNode>().strength(-250))
      .force(
        "link",
        forceLink<SimNode, SimEdge>(simEdges)
          .id((d) => d.id)
          .distance(100)
          .strength(0.3),
      )
      .force(
        "collide",
        forceCollide<SimNode>()
          .radius((d) => COLLIDE_RADIUS[d.level] ?? 28)
          .strength(1)
          .iterations(3),
      )
      // Gentle pull to keep nodes within bounds
      .force("x", forceX<SimNode>(width / 2).strength(0.03))
      .force("y", forceY<SimNode>(height / 2).strength(0.03))
      .alpha(1)
      .alphaDecay(0.02)
      .velocityDecay(0.3);

    const padding = 40;
    sim.on("tick", () => {
      for (const n of simNodes) {
        n.x = Math.max(padding, Math.min(width - padding, n.x));
        n.y = Math.max(padding, Math.min(height - padding, n.y));
      }
      setPositions([...simNodes]);
    });

    simRef.current = sim;

    return () => {
      sim.stop();
      simRef.current = null;
    };
  }, [nodes, edges, width, height]);

  // Drag handlers — reheat simulation, fix/release node
  const dragStart = useCallback((id: string, svgX: number, svgY: number) => {
    const sim = simRef.current;
    if (!sim) return;
    sim.alphaTarget(0.3).restart();
    const node = nodesRef.current.find((n) => n.id === id);
    if (node) {
      node.fx = svgX;
      node.fy = svgY;
    }
  }, []);

  const dragMove = useCallback((id: string, svgX: number, svgY: number) => {
    const node = nodesRef.current.find((n) => n.id === id);
    if (node) {
      node.fx = svgX;
      node.fy = svgY;
    }
  }, []);

  const dragEnd = useCallback((id: string) => {
    const sim = simRef.current;
    if (!sim) return;
    sim.alphaTarget(0);
    const node = nodesRef.current.find((n) => n.id === id);
    if (node) {
      node.fx = null;
      node.fy = null;
    }
  }, []);

  return { positions, dragStart, dragMove, dragEnd };
}
