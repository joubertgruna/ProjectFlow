import { ArrowRight, BarChart3, Brain, CheckCircle2, Lock, PanelsTopLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LandingPage() {
  return (
    <main className="landing">
      <nav className="landing-nav">
        <Link className="brand compact" to="/">
          <span className="brand-mark">P</span>
          <strong>ProjectFlow</strong>
        </Link>
        <div>
          <Link to="/login">Entrar</Link>
          <Link className="button button-primary" to="/register">Começar</Link>
        </div>
      </nav>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">Gestão de projetos com leitura executiva</span>
          <h1>Controle prazos, riscos e orçamento com clareza.</h1>
          <p>
            Uma plataforma minimalista para cadastrar projetos, acompanhar evolução,
            validar transições de status e gerar análises inteligentes para decisões rápidas.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" to="/dashboard">
              Abrir dashboard <ArrowRight size={18} />
            </Link>
            <Link className="button button-ghost" to="/login">Acessar conta</Link>
          </div>
        </div>
        <div className="hero-product">
          <div className="product-bar">
            <span />
            <span />
            <span />
          </div>
          <div className="product-grid">
            <article><BarChart3 size={22} /><strong>72%</strong><span>execução saudável</span></article>
            <article><Brain size={22} /><strong>IA</strong><span>análise executiva</span></article>
            <article><Lock size={22} /><strong>5</strong><span>regras críticas</span></article>
            <article><PanelsTopLeft size={22} /><strong>360°</strong><span>visão de portfólio</span></article>
          </div>
        </div>
      </section>

      <section className="feature-band">
        {[
          'Cadastro completo de projetos',
          'Risco automático por prazo e orçamento',
          'Fluxo de status sem pular etapas',
          'Dashboard com indicadores de acompanhamento',
        ].map((item) => (
          <div key={item}><CheckCircle2 size={18} /> {item}</div>
        ))}
      </section>
    </main>
  );
}
