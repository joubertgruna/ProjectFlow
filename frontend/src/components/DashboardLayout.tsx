import {
  FolderKanban,
  Home,
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  ShieldCheck,
  X,
} from 'lucide-react';
import { PropsWithChildren, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { authStorage } from '../services/auth.storage';

export function DashboardLayout({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const user = authStorage.getUser();

  return (
    <div className="app-shell">
      <aside className={`sidebar ${open ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <span className="brand-mark">P</span>
          <div>
            <strong>ProjectFlow</strong>
            <small>Gestão executiva</small>
          </div>
        </div>
        <nav className="side-nav">
          <NavLink to="/dashboard" onClick={() => setOpen(false)}>
            <LayoutDashboard size={18} /> Dashboard
          </NavLink>
          <NavLink to="/projects" end onClick={() => setOpen(false)}>
            <FolderKanban size={18} /> Projetos
          </NavLink>
          <NavLink to="/projects/new" onClick={() => setOpen(false)}>
            <Plus size={18} /> Novo projeto
          </NavLink>
        </nav>
        <div className="sidebar-footer">
          <ShieldCheck size={18} />
          <span>IA mock ativa</span>
        </div>
      </aside>
      {open && <button className="scrim" aria-label="Fechar menu" onClick={() => setOpen(false)} />}
      <div className="workspace">
        <header className="dashboard-topbar">
          <button className="icon-button mobile-only" aria-label="Abrir menu" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </button>
          <Link className="topbar-home" to="/">
            <Home size={18} /> Landing
          </Link>
          <div className="topbar-actions">
            {user && <span className="user-chip">{user.name}</span>}
            <Link className="button button-ghost" to="/login" onClick={() => authService.logout()}>
              <LogOut size={16} /> Sair
            </Link>
          </div>
          <button className="icon-button close-menu" aria-label="Fechar menu" onClick={() => setOpen(false)}>
            <X size={20} />
          </button>
        </header>
        <main className="workspace-content">{children}</main>
      </div>
    </div>
  );
}
