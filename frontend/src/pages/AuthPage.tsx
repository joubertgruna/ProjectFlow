import {
  ArrowRight,
  BarChart3,
  Brain,
  CalendarCheck2,
  CheckCircle2,
  Gauge,
  Mail,
  ShieldCheck,
  UserPlus,
} from 'lucide-react';
import { FormEvent, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { authService } from '../services/auth.service';

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const navigate = useNavigate();
  const isRegister = mode === 'register';
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get('email') ?? '');
    const password = String(formData.get('password') ?? '');
    const name = String(formData.get('name') ?? '');

    try {
      if (isRegister) {
        await authService.register({ name, email, password });
      } else {
        await authService.login({ email, password });
      }
      navigate('/dashboard');
    } catch {
      setError(
        isRegister
          ? 'Não foi possível registrar. Verifique os dados ou use outro e-mail.'
          : 'E-mail ou senha inválidos.',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-panel">
        <Link className="brand compact" to="/">
          <span className="brand-mark">P</span>
          <strong>ProjectFlow</strong>
        </Link>
        <h1>{isRegister ? 'Crie sua conta' : 'Acesse sua conta'}</h1>
        <p>
          {isRegister
            ? 'Configure seu acesso para acompanhar o portfólio de projetos.'
            : 'Entre para continuar o acompanhamento dos projetos.'}
        </p>
        <form className="form" onSubmit={handleSubmit}>
          {isRegister && (
            <label>
              Nome
              <input required name="name" placeholder="Seu nome" />
            </label>
          )}
          <label>
            E-mail
            <input required name="email" type="email" placeholder="voce@email.com" />
          </label>
          <label>
            Senha
            <input required name="password" type="password" placeholder="••••••••" minLength={6} />
          </label>
          {error && <p className="error">{error}</p>}
          <Button type="submit" disabled={loading}>
            {isRegister ? <UserPlus size={18} /> : <Mail size={18} />}
            {loading ? 'Aguarde...' : isRegister ? 'Registrar' : 'Entrar'}
          </Button>
        </form>
        <p className="auth-switch">
          {isRegister ? 'Já possui conta?' : 'Ainda não possui conta?'}{' '}
          <Link to={isRegister ? '/login' : '/register'}>
            {isRegister ? 'Entrar' : 'Registrar'}
          </Link>
        </p>
      </section>
      <aside className="auth-aside">
        <div className="auth-aside-content">
          <span className="auth-aside-icon"><Gauge size={28} /></span>
          <h2>ProjectFlow transforma projetos em decisões executivas.</h2>
          <p>
            Cadastre iniciativas, acompanhe orçamento e prazo, calcule risco automaticamente
            e use IA para gerar recomendações claras para acompanhamento executivo.
          </p>
          <div className="auth-feature-list">
            <span><CalendarCheck2 size={17} /> Fluxo de status sem pular etapas</span>
            <span><BarChart3 size={17} /> Indicadores de risco, orçamento e conclusão</span>
            <span><Brain size={17} /> Análise inteligente com recomendação executiva</span>
          </div>
          <div className="auth-proof-grid">
            <span><CheckCircle2 size={16} /> Cadastro e edição</span>
            <span><CheckCircle2 size={16} /> Risco automático</span>
            <span><ShieldCheck size={16} /> Acesso protegido</span>
          </div>
          <Link to="/dashboard">
            Ver dashboard <ArrowRight size={16} />
          </Link>
        </div>
      </aside>
    </main>
  );
}
