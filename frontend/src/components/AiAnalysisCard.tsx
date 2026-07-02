import { AiAnalysis } from '../types/project';

export function AiAnalysisCard({ analysis }: { analysis: AiAnalysis }) {
  return (
    <section className="panel">
      <h2>Análise com IA</h2>
      <h3>Resumo</h3>
      <p>{analysis.summary}</p>
      <h3>Pontos de atenção</h3>
      <ul>{analysis.attentionPoints.map((point) => <li key={point}>{point}</li>)}</ul>
      <h3>Recomendação executiva</h3>
      <p>{analysis.executiveRecommendation}</p>
    </section>
  );
}
