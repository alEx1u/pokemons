// Input.tsx
import React, { forwardRef } from 'react';
import clsx from 'clsx';
import styles from './Input.module.scss';

interface InputProps extends React.ComponentPropsWithoutRef<'input'> {
  error?: string | boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ id, placeholder, error, className, ...props }, ref) => {
    return (
      <label htmlFor={id}>
        <div className={styles.placeholder}>{placeholder}</div>
        <input
          id={id}
          ref={ref}
          className={clsx(styles.input, error && styles['input--error'], className)}
          {...props}
        />
        {error && typeof error === 'string' && <span className={styles.span}>{error}</span>}
      </label>
    );
  }
);
