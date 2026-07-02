import { ArrowRight, Mail, ShieldCheck, UserPlus } from 'lucide-react';
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
        <ShieldCheck size={28} />
        <h2>Autenticação segura com sessão JWT</h2>
        <p>
          Login e registro já comunicam com a API, armazenam o token de acesso e
          protegem o painel de projetos.
        </p>
        <Link to="/dashboard">
          Ver dashboard <ArrowRight size={16} />
        </Link>
      </aside>
    </main>
  );
}
