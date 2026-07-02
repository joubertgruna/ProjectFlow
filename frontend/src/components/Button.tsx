import { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type Props = PropsWithChildren<ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' | 'danger' }>;

export function Button({ children, variant = 'primary', ...props }: Props) {
  return (
    <button className={`button button-${variant}`} {...props}>
      {children}
    </button>
  );
}
