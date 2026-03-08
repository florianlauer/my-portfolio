"use client";

import { useEffect, useRef, useState } from "react";
import { forceSimulation, forceCenter, forceManyBody, forceLink, forceCollide } from "d3-force";
import type { Simulation, SimulationNodeDatum, SimulationLinkDatum } from "d3-force";
import type { GraphNode, GraphEdge } from "@/types/stack-graph";

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

export function useForceLayout(
  nodes: GraphNode[],
  edges: GraphEdge[],
  width: number,
  height: number,
): { positions: SimNode[]; isStabilized: boolean } {
  const [positions, setPositions] = useState<SimNode[]>([]);
  const [isStabilized, setIsStabilized] = useState(false);
  const simRef = useRef<Simulation<SimNode, SimEdge> | null>(null);
  const initRef = useRef(false);

  useEffect(() => {
    if (width <= 0 || height <= 0 || nodes.length === 0) return;
    if (initRef.current) return;
    initRef.current = true;

    const simNodes: SimNode[] = nodes.map((n) => ({
      ...n,
      x: width / 2 + (Math.random() - 0.5) * 100,
      y: height / 2 + (Math.random() - 0.5) * 100,
      vx: 0,
      vy: 0,
    }));

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
          .distance(120)
          .strength(0.4),
      )
      .force("collide", forceCollide<SimNode>().radius(40))
      .alpha(1)
      .alphaDecay(0.02)
      .velocityDecay(0.3);

    sim.on("tick", () => {
      setPositions([...simNodes]);
    });

    sim.on("end", () => {
      setIsStabilized(true);
    });

    simRef.current = sim;

    return () => {
      sim.stop();
      simRef.current = null;
    };
  }, [nodes, edges, width, height]);

  return { positions, isStabilized };
}
