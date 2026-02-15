type AssetPlaceholderProps = {
  id: string;
  title: string;
  description: string;
  dimensions: string;
  className?: string;
};

export function AssetPlaceholder({
  id,
  title,
  description,
  dimensions,
  className = "",
}: AssetPlaceholderProps): React.JSX.Element {
  return (
    <div
      id={id}
      className={
        "rounded-xl border-2 border-dashed border-amber-500/60 bg-amber-500/5 px-4 py-3 text-left " +
        className
      }
      aria-label={`Placeholder asset: ${title}`}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-amber-700 dark:text-amber-400">
        Votre image ici — Asset {id}
      </p>
      <p className="mt-1 font-medium text-foreground">{title}</p>
      <p className="mt-0.5 text-sm text-muted-foreground">{description}</p>
      <p className="mt-1 text-xs text-muted-foreground">
        Format recommandé : <strong>{dimensions}</strong>
      </p>
    </div>
  );
}
