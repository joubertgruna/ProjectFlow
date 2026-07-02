import { PropsWithChildren } from 'react';
import { Button } from './Button';

type Props = PropsWithChildren<{ open: boolean; onClose: () => void; title: string }>;

export function Modal({ open, onClose, title, children }: Props) {
  if (!open) return null;
  return (
    <div className="modal-backdrop">
      <section className="modal">
        <header>
          <h2>{title}</h2>
          <Button variant="ghost" onClick={onClose}>Fechar</Button>
        </header>
        {children}
      </section>
    </div>
  );
}
