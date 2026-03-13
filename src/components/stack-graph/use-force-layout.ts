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
  reducedMotion = false,
) {
  const [positions, setPositions] = useState<SimNode[]>([]);
  const simRef = useRef<Simulation<SimNode, SimEdge> | null>(null);
  const nodesRef = useRef<SimNode[]>([]);
  // Store the original full node/edge arrays for filter restores
  const allNodesRef = useRef<SimNode[]>([]);
  const allEdgesRef = useRef<GraphEdge[]>([]);
  const initRef = useRef(false);
  const widthRef = useRef(width);
  const heightRef = useRef(height);
  const reducedMotionRef = useRef(reducedMotion);

  useEffect(() => {
    widthRef.current = width;
    heightRef.current = height;
  }, [width, height]);

  useEffect(() => {
    reducedMotionRef.current = reducedMotion;
  }, [reducedMotion]);

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
    // Store originals for filter restore
    allNodesRef.current = simNodes;
    allEdgesRef.current = edges;

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

    if (reducedMotion) {
      // Sync branch: compute fully converged layout without animation frames
      sim.stop();
      while (sim.alpha() > sim.alphaMin()) {
        sim.tick();
      }
      // Clamp all nodes within bounds after convergence
      for (const n of nodesRef.current) {
        n.x = Math.max(padding, Math.min(width - padding, n.x));
        n.y = Math.max(padding, Math.min(height - padding, n.y));
      }
      setPositions([...nodesRef.current]);
      // Do NOT assign simRef — keeps it null, which disables drag handlers
    } else {
      // Animated branch: tick-by-tick via d3 event loop
      sim.on("tick", () => {
        for (const n of nodesRef.current) {
          n.x = Math.max(padding, Math.min(widthRef.current - padding, n.x));
          n.y = Math.max(padding, Math.min(heightRef.current - padding, n.y));
        }
        setPositions([...nodesRef.current]);
      });

      simRef.current = sim;
    }

    return () => {
      sim.stop();
      simRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodes, edges, width, height]);

  // Filter the running simulation to only show active nodes
  // CRITICAL: must NOT be called during init — only called via useEffect in StackGraph when filters change
  const filterNodes = useCallback((activeNodeIds: Set<string>) => {
    // Build a position map from current nodes to preserve positions
    const positionMap = new Map<string, { x: number; y: number; vx: number; vy: number }>();
    for (const n of allNodesRef.current) {
      positionMap.set(n.id, { x: n.x, y: n.y, vx: n.vx ?? 0, vy: n.vy ?? 0 });
    }

    // Filter nodes — always include methods family
    const filteredNodes = allNodesRef.current.filter((n) => activeNodeIds.has(n.id));

    // Restore positions for remaining nodes
    for (const n of filteredNodes) {
      const saved = positionMap.get(n.id);
      if (saved) {
        n.x = saved.x;
        n.y = saved.y;
        n.vx = saved.vx;
        n.vy = saved.vy;
      }
    }

    nodesRef.current = filteredNodes;

    // Filter edges to only those where both endpoints are active
    const filteredSimEdges: SimEdge[] = allEdgesRef.current
      .filter((e) => activeNodeIds.has(e.source) && activeNodeIds.has(e.target))
      .map((e) => ({ source: e.source, target: e.target }));

    if (reducedMotionRef.current) {
      // Reduced-motion branch: create a temporary simulation and run synchronously to convergence
      const tempNodes = filteredNodes.map((n) => ({ ...n }));
      const tempSim = forceSimulation<SimNode>(tempNodes)
        .force("center", forceCenter(widthRef.current / 2, heightRef.current / 2))
        .force("charge", forceManyBody<SimNode>().strength(-250))
        .force(
          "link",
          forceLink<SimNode, SimEdge>(filteredSimEdges)
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
        .force("x", forceX<SimNode>(widthRef.current / 2).strength(0.03))
        .force("y", forceY<SimNode>(heightRef.current / 2).strength(0.03))
        .alpha(0.5)
        .alphaDecay(0.02)
        .velocityDecay(0.3);

      tempSim.stop();
      while (tempSim.alpha() > tempSim.alphaMin()) {
        tempSim.tick();
      }

      const padding = 40;
      for (const n of tempNodes) {
        n.x = Math.max(padding, Math.min(widthRef.current - padding, n.x));
        n.y = Math.max(padding, Math.min(heightRef.current - padding, n.y));
      }

      // Sync positions back to filteredNodes (nodesRef) for consistent state
      for (let i = 0; i < filteredNodes.length; i++) {
        const src = tempNodes[i];
        const dst = filteredNodes[i];
        if (src && dst) {
          dst.x = src.x;
          dst.y = src.y;
        }
      }

      setPositions([...filteredNodes]);
    } else {
      // Animated branch: update running simulation in-place
      const sim = simRef.current;
      if (!sim) return;

      sim.nodes(filteredNodes);
      const linkForce = sim.force<ReturnType<typeof forceLink>>("link");
      if (linkForce) {
        linkForce.links(filteredSimEdges);
      }
      sim.alpha(0.5).restart();
    }
  }, []);

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

  return { positions, dragStart, dragMove, dragEnd, filterNodes };
}
