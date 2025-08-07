import clsx from 'clsx';
import styles from './Typography.module.scss';

const variantList = [
  'title',
  'sub-title',
  'title-regular',
  'body',
  'title-body',
  'sub-body',
] as const;

type TypographyVariant = (typeof variantList)[number];
interface TitleProps {
  tag?: 'h1' | 'h2' | 'span' | 'div';
  variant?: TypographyVariant;
  children: React.ReactNode;
  className?: string;
}

export const Typography = ({ children, tag = 'div', variant = 'title', className }: TitleProps) => {
  if (!variantList.includes(variant)) {
    throw new Error(`Unknown typography variant: ${variant}`);
  }
  const Component = tag;
  const variantClass = styles['typography--' + variant];

  return (
    <Component className={clsx(styles.typography, variantClass, className)}>{children}</Component>
  );
};
