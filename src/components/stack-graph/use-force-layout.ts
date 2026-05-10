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
import type { GraphNode, GraphEdge } from "@/types/stack-graph";
import { COLLIDE_RADIUS_BY_LEVEL, FORCE_CONFIG } from "@/components/stack-graph/constants";

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

// Single source of truth for force configuration — used by init and filter rebuilds.
// Collision radii are NOT scaled by the visual radiusScale: keeping the spatial
// footprint constant lets nodes spread to fill the container even when their
// visible circles are smaller (e.g. compact / mobile mode).
function buildSimulation(
  simNodes: SimNode[],
  simEdges: SimEdge[],
  width: number,
  height: number,
  alpha: number,
): Simulation<SimNode, SimEdge> {
  return forceSimulation<SimNode>(simNodes)
    .force("center", forceCenter(width / 2, height / 2))
    .force("charge", forceManyBody<SimNode>().strength(FORCE_CONFIG.charge))
    .force(
      "link",
      forceLink<SimNode, SimEdge>(simEdges)
        .id((d) => d.id)
        .distance(FORCE_CONFIG.linkDistance)
        .strength(FORCE_CONFIG.linkStrength),
    )
    .force(
      "collide",
      forceCollide<SimNode>()
        .radius((d) => COLLIDE_RADIUS_BY_LEVEL[d.level] ?? 28)
        .strength(FORCE_CONFIG.collideStrength)
        .iterations(FORCE_CONFIG.collideIterations),
    )
    .force("x", forceX<SimNode>(width / 2).strength(FORCE_CONFIG.positionStrength))
    .force("y", forceY<SimNode>(height / 2).strength(FORCE_CONFIG.positionStrength))
    .alpha(alpha)
    .alphaDecay(FORCE_CONFIG.alphaDecay)
    .velocityDecay(FORCE_CONFIG.velocityDecay);
}

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

  // Init effect: builds the simulation on first valid size; on subsequent
  // size changes, updates positional forces in place rather than rebuilding
  // (a rebuild would reset all node positions to fresh Math.random() seeds).
  // The cleanup is intentionally NOT placed here — see the unmount-only
  // cleanup effect below. Otherwise React would tear down the simulation on
  // every ResizeObserver tick (initial layout, font load, scrollbar, rotate)
  // and the stale `initRef.current` would prevent re-init, leaving drag/filter
  // permanently broken.
  useEffect(() => {
    if (width <= 0 || height <= 0 || nodes.length === 0) return;

    if (initRef.current) {
      // Already initialized: re-tune positional forces in place. Only the
      // animated branch keeps a live sim; the reduced-motion branch ignores
      // resize (acceptable — its layout is computed once at init).
      const sim = simRef.current;
      if (sim) {
        sim.force("center", forceCenter(width / 2, height / 2));
        sim.force("x", forceX<SimNode>(width / 2).strength(FORCE_CONFIG.positionStrength));
        sim.force("y", forceY<SimNode>(height / 2).strength(FORCE_CONFIG.positionStrength));
        sim.alpha(0.3).restart();
      }
      return;
    }

    // One-shot init: data (nodes/edges) is treated as static at runtime.
    // Re-running on data changes would reset positions; we accept this trade-off.
    initRef.current = true;

    const simNodes: SimNode[] = nodes.map((n) => ({
      ...n,
      x: width / 2 + (Math.random() - 0.5) * width * 0.6,
      y: height / 2 + (Math.random() - 0.5) * height * 0.6,
      vx: 0,
      vy: 0,
    }));
    nodesRef.current = simNodes;
    allNodesRef.current = simNodes;
    allEdgesRef.current = edges;

    const simEdges: SimEdge[] = edges.map((e) => ({
      source: e.source,
      target: e.target,
    }));

    const sim = buildSimulation(simNodes, simEdges, width, height, 1);
    const padding = FORCE_CONFIG.clampPadding;

    if (reducedMotion) {
      // Sync branch: compute fully converged layout without animation frames
      sim.stop();
      while (sim.alpha() > sim.alphaMin()) {
        sim.tick();
      }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- one-shot init: nodes/edges/reducedMotion changes after mount are intentionally ignored; size changes are handled in-place above.
  }, [nodes, edges, width, height]);

  // Unmount-only cleanup: tear down the simulation exactly once when the
  // component leaves. Decoupled from the init effect so size-related re-runs
  // don't kill the simulation (see comment on init effect above).
  useEffect(
    () => () => {
      simRef.current?.stop();
      simRef.current = null;
      initRef.current = false;
    },
    [],
  );

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
      // Reduced-motion branch: build a temp simulation via the shared factory
      // and run it synchronously to convergence.
      const tempNodes = filteredNodes.map((n) => ({ ...n }));
      const tempSim = buildSimulation(
        tempNodes,
        filteredSimEdges,
        widthRef.current,
        heightRef.current,
        0.5,
      );

      tempSim.stop();
      while (tempSim.alpha() > tempSim.alphaMin()) {
        tempSim.tick();
      }

      const padding = FORCE_CONFIG.clampPadding;
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
