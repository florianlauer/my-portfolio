"use client";

import Image from "next/image";
import { useState } from "react";

type FlagImageProps = {
  src: string;
  /** Pre-translated, ready-to-use aria-label and alt (e.g. "Flag of Lorraine"). */
  ariaLabel: string;
};

export function FlagImage({ src, ariaLabel }: FlagImageProps): React.JSX.Element {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span
        className="inline-flex h-5 w-7 items-center justify-center rounded-sm border border-border/60 bg-muted text-xs"
        role="img"
        aria-label={ariaLabel}
      >
        🏳️
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={ariaLabel}
      width={30}
      height={18}
      className="h-5 w-7 rounded-sm border border-border/60 object-cover"
      onError={() => setError(true)}
    />
  );
}
