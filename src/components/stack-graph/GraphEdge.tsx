type GraphEdgeProps = {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
};

export function GraphEdge({ x1, y1, x2, y2 }: GraphEdgeProps): React.JSX.Element {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const cx1 = x1 + dx * 0.25;
  const cy1 = y1 + dy * 0.1;
  const cx2 = x1 + dx * 0.75;
  const cy2 = y2 - dy * 0.1;
  const d = `M ${x1} ${y1} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x2} ${y2}`;

  return <path d={d} stroke="#888" strokeOpacity={0.35} strokeWidth={1.5} fill="none" />;
}
