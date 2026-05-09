type GraphEdgeProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  opacity?: number;
  highlighted?: boolean;
  reducedMotion?: boolean;
};

export function GraphEdge({
  x1,
  y1,
  x2,
  y2,
  opacity,
  highlighted = false,
  reducedMotion = false,
}: GraphEdgeProps): React.JSX.Element {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx1 = x1 + dx * 0.25;
  const cy1 = y1 + dy * 0.1;
  const cx2 = x1 + dx * 0.75;
  const cy2 = y2 - dy * 0.1;
  const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  const stroke = highlighted ? "var(--foreground)" : "#888";
  const strokeWidth = highlighted ? 3 : 1.5;
  const strokeOpacity = highlighted ? 0.85 : 0.35;

  return (
    <path
      d={d}
      stroke={stroke}
      strokeOpacity={strokeOpacity}
      strokeWidth={strokeWidth}
      fill="none"
      style={{
        opacity: opacity ?? 1,
        transition: reducedMotion
          ? "opacity 200ms ease"
          : "opacity 200ms ease, stroke-width 200ms ease, stroke-opacity 200ms ease",
      }}
    >
      {highlighted && !reducedMotion && (
        <animate
          attributeName="stroke-opacity"
          values="0.6;1;0.6"
          dur="1.6s"
          repeatCount="indefinite"
        />
      )}
    </path>
  );
}
