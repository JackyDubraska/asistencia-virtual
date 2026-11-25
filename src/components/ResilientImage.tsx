import { useState } from 'react';

interface ResilientImageProps {
  src?: string;
  alt: string;
  className?: string;
  fallbackIcon?: string;
  fallbackClassName?: string;
}

export function ResilientImage({
  src,
  alt,
  className = '',
  fallbackIcon = 'shopping_bag',
  fallbackClassName = 'w-full h-44 bg-gradient-to-br from-pastel-lila/50 via-pastel-rosa/40 to-pastel-menta/50 flex flex-col items-center justify-center gap-2 text-light-primary',
}: ResilientImageProps) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={fallbackClassName}
        role="img"
        aria-label={alt}
      >
        <span
          className="material-symbols-outlined text-[40px]"
          aria-hidden="true"
        >
          {fallbackIcon}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
