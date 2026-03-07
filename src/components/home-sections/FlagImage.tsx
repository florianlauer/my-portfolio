"use client";

import Image from "next/image";
import { useState } from "react";

type FlagImageProps = {
  src: string;
  label: string;
};

export function FlagImage({ src, label }: FlagImageProps): React.JSX.Element {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <span
        className="inline-flex h-5 w-7 items-center justify-center rounded-sm border border-border/60 bg-muted text-xs"
        role="img"
        aria-label={`Drapeau ${label}`}
      >
        🏳️
      </span>
    );
  }

  return (
    <Image
      src={src}
      alt={`Drapeau ${label}`}
      width={30}
      height={18}
      className="h-5 w-7 rounded-sm border border-border/60 object-cover"
      onError={() => setError(true)}
    />
  );
}
