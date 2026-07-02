import { LucideIcon } from 'lucide-react';

type Props = {
  title: string;
  value: string | number;
  hint: string;
  icon: LucideIcon;
};

export function MetricCard({ title, value, hint, icon: Icon }: Props) {
  return (
    <article className="metric-card">
      <div className="metric-icon"><Icon size={20} /></div>
      <span>{title}</span>
      <strong>{value}</strong>
      <small>{hint}</small>
    </article>
  );
}
