"use client";

import { useTranslations } from "next-intl";
import type { GraphNode, GraphEdge } from "@/types/stack-graph";

type StackGraphSRListProps = {
  nodes: readonly GraphNode[];
  edges: readonly GraphEdge[];
};

export function StackGraphSRList({ nodes, edges }: StackGraphSRListProps): React.JSX.Element {
  const t = useTranslations("stack");
  return (
    <section aria-label={t("graph.techsListLabel")} className="sr-only">
      <ul>
        {nodes.map((node) => {
          const connectedIds = edges
            .filter((e) => e.source === node.id || e.target === node.id)
            .map((e) => (e.source === node.id ? e.target : e.source));

          const connectedLabels = connectedIds
            .filter((id) => nodes.find((n) => n.id === id) !== undefined)
            .map((id) => t(`itemLabels.${id}`));

          return (
            <li key={node.id}>
              <strong>{t(`itemLabels.${node.id}`)}</strong> — {t(`levels.${node.level}`)}.{" "}
              {t(`nodeDescriptions.${node.id}`)}
              {connectedLabels.length > 0 && (
                <>
                  {" "}
                  {t("graph.relatedToPrefix")} : {connectedLabels.join(", ")}.
                </>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
