import { useEffect, useRef, useState } from 'react';
import styles from './ThemeTransitiionOverlay.module.scss';
import clsx from 'clsx';

// не используется

type ThemeTransitiionOverlayProps = {
  onComplete: () => void;
  origin: { x: number; y: number };
};

export const ThemeTransitiionOverlay = ({ onComplete, origin }: ThemeTransitiionOverlayProps) => {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [animating, setAnimating] = useState<boolean>(false);

  useEffect(() => {
    setAnimating(true);
    const timeout = setTimeout(() => {
      setAnimating(false);
      onComplete();
    }, 700);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div
      ref={overlayRef}
      className={clsx(styles['theme-transition-overlay'], {
        [styles['theme-transition-overlay--active']]: animating,
      })}
      style={{
        left: `${origin.x}px`,
        top: `${origin.y}px`,
      }}
    />
  );
};
