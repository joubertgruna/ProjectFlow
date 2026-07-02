import { zodResolver } from '@hookform/resolvers/zod';
import { Banknote, CalendarDays, FileText, FolderKanban, Save, Sparkles } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from './Button';
import { Project, ProjectPayload, ProjectRisk } from '../types/project';
import { formatCurrency } from '../utils/formatCurrency';
import { toInputDate } from '../utils/formatDate';

const schema = z.object({
  name: z.string().min(1, 'Informe o nome'),
  startDate: z.string().min(1, 'Informe a data inicial'),
  endDate: z.string().min(1, 'Informe a data final'),
  totalBudget: z.coerce.number().positive('Informe um orçamento maior que zero'),
  description: z.string().min(1, 'Informe a descrição'),
}).refine((data) => new Date(data.endDate) > new Date(data.startDate), {
  message: 'A data final deve ser maior que a inicial',
  path: ['endDate'],
});

type Props = { project?: Project; onSubmit: (payload: ProjectPayload) => void; loading?: boolean };

function estimateRisk(totalBudget = 0, startDate?: string, endDate?: string) {
  const start = startDate ? new Date(startDate) : null;
  const end = endDate ? new Date(endDate) : null;
  const months =
    start && end && end > start ? (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24 * 30) : 0;

  if (totalBudget > 500000 || months > 6) return ProjectRisk.HIGH;
  if (totalBudget >= 100001 || months > 3) return ProjectRisk.MEDIUM;
  return ProjectRisk.LOW;
}

const riskLabel: Record<ProjectRisk, string> = {
  LOW: 'Baixo',
  MEDIUM: 'Médio',
  HIGH: 'Alto',
};

export function ProjectForm({ project, onSubmit, loading }: Props) {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ProjectPayload>({
    resolver: zodResolver(schema),
    defaultValues: project ? {
      name: project.name,
      startDate: toInputDate(project.startDate),
      endDate: toInputDate(project.endDate),
      totalBudget: project.totalBudget,
      description: project.description,
    } : undefined,
  });
  const values = watch();
  const estimatedRisk = estimateRisk(values.totalBudget, values.startDate, values.endDate);
  const hasDates = values.startDate && values.endDate && new Date(values.endDate) > new Date(values.startDate);
  const durationDays = hasDates
    ? Math.ceil((new Date(values.endDate).getTime() - new Date(values.startDate).getTime()) / (1000 * 60 * 60 * 24))
    : 0;

  return (
    <form className="project-form-layout" onSubmit={handleSubmit(onSubmit)}>
      <section className="form-workbench">
        <div className="form-section-title">
          <span><FolderKanban size={18} /></span>
          <div>
            <h2>Informações principais</h2>
            <p>Preencha os dados essenciais para criar a base de acompanhamento.</p>
          </div>
        </div>

        <div className="field-grid">
          <label className="field-card span-2">
            <span><FileText size={17} /> Nome do projeto</span>
            <input {...register('name')} placeholder="Ex.: Plataforma de atendimento" />
            {errors.name && <small>{errors.name.message}</small>}
          </label>

          <label className="field-card">
            <span><CalendarDays size={17} /> Data de início</span>
            <input type="date" {...register('startDate')} />
            {errors.startDate && <small>{errors.startDate.message}</small>}
          </label>

          <label className="field-card">
            <span><CalendarDays size={17} /> Previsão de término</span>
            <input type="date" {...register('endDate')} />
            {errors.endDate && <small>{errors.endDate.message}</small>}
          </label>

          <label className="field-card span-2">
            <span><Banknote size={17} /> Orçamento</span>
            <input type="number" step="0.01" {...register('totalBudget')} placeholder="0,00" />
            {errors.totalBudget && <small>{errors.totalBudget.message}</small>}
          </label>

          <label className="field-card span-2">
            <span><Sparkles size={17} /> Descrição executiva</span>
            <textarea rows={6} {...register('description')} placeholder="Contexto, objetivos, entregas esperadas e dependências importantes." />
            {errors.description && <small>{errors.description.message}</small>}
          </label>
        </div>
      </section>

      <aside className="project-live-preview">
        <div className="preview-header">
          <span><Sparkles size={18} /></span>
          <strong>Prévia inteligente</strong>
        </div>
        <h2>{values.name || 'Nome do projeto'}</h2>
        <p>{values.description || 'A descrição aparecerá aqui conforme você preenche o formulário.'}</p>

        <div className="preview-metrics">
          <div>
            <span>Risco estimado</span>
            <strong className={`risk-text-${estimatedRisk.toLowerCase()}`}>{riskLabel[estimatedRisk]}</strong>
          </div>
          <div>
            <span>Orçamento</span>
            <strong>{formatCurrency(Number(values.totalBudget) || 0)}</strong>
          </div>
          <div>
            <span>Duração</span>
            <strong>{durationDays ? `${durationDays} dias` : 'A definir'}</strong>
          </div>
        </div>

        <div className="risk-meter" aria-label={`Risco estimado ${riskLabel[estimatedRisk]}`}>
          <span className={estimatedRisk === ProjectRisk.LOW ? 'active' : ''} />
          <span className={estimatedRisk === ProjectRisk.MEDIUM ? 'active' : ''} />
          <span className={estimatedRisk === ProjectRisk.HIGH ? 'active' : ''} />
        </div>

        <div className="preview-note">
          O risco final será recalculado no backend sempre que orçamento ou datas forem salvos.
        </div>

        <Button type="submit" disabled={loading}>
          <Save size={18} />
          {loading ? 'Salvando...' : 'Salvar projeto'}
        </Button>
      </aside>
    </form>
  );
}
