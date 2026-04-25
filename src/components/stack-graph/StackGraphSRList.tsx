"use client";

import type { GraphNode, GraphEdge } from "@/types/stack-graph";

type StackGraphSRListProps = {
  nodes: GraphNode[];
  edges: GraphEdge[];
};

export function StackGraphSRList({ nodes, edges }: StackGraphSRListProps): React.JSX.Element {
  return (
    <section aria-label="Liste des technologies" className="sr-only">
      <ul>
        {nodes.map((node) => {
          // Find connected node IDs
          const connectedIds = edges
            .filter((e) => e.source === node.id || e.target === node.id)
            .map((e) => (e.source === node.id ? e.target : e.source));

          // Resolve IDs to labels (only from the currently active nodes)
          const connectedLabels = connectedIds
            .map((id) => nodes.find((n) => n.id === id)?.label)
            .filter((label): label is string => label !== undefined);

          return (
            <li key={node.id}>
              <strong>{node.label}</strong> — {node.level}. {node.description}
              {connectedLabels.length > 0 && <> Lié à : {connectedLabels.join(", ")}.</>}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
