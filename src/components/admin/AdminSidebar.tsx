import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Users,
  MessageSquareQuote,
  Briefcase,
  Image,
  Settings,
  FileText,
  FolderOpen,
  LogOut,
  ChevronLeft,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/team', label: 'Equipe', icon: Users },
  { href: '/admin/testimonials', label: 'Depoimentos', icon: MessageSquareQuote },
  { href: '/admin/cases', label: 'Cases', icon: Briefcase },
  { href: '/admin/media', label: 'Mídia', icon: Image },
  { type: 'divider' as const },
  { href: '/admin/blog', label: 'Posts do Blog', icon: FileText },
  { href: '/admin/blog/categories', label: 'Categorias', icon: FolderOpen },
  { type: 'divider' as const },
  { href: '/admin/settings', label: 'Configurações', icon: Settings },
];

export default function AdminSidebar() {
  const location = useLocation();
  const { signOut, user } = useAuth();

  return (
    <aside className="w-64 bg-primary text-primary-foreground min-h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-primary-foreground/10">
        <Link to="/" className="flex items-center gap-2 text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors mb-4">
          <ChevronLeft className="w-4 h-4" />
          Voltar ao site
        </Link>
        <h1 className="text-xl font-bold font-serif">SM Admin</h1>
        <p className="text-xs text-primary-foreground/50 mt-1">Painel de Administração</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            if (item.type === 'divider') {
              return <li key={index} className="my-4 border-t border-primary-foreground/10" />;
            }

            const Icon = item.icon;
            const isActive = location.pathname === item.href ||
              (item.href === '/admin/blog' && location.pathname.startsWith('/admin/blog') && !location.pathname.includes('categories'));

            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    'flex items-center gap-3 px-4 py-2.5 text-sm transition-all duration-200',
                    isActive
                      ? 'bg-primary-foreground/10 text-primary-foreground'
                      : 'text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5'
                  )}
                >
                  <Icon className="w-4 h-4" strokeWidth={1.5} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User & Logout */}
      <div className="p-4 border-t border-primary-foreground/10">
        <div className="px-4 py-2 mb-2">
          <p className="text-xs text-primary-foreground/40">Logado como</p>
          <p className="text-sm text-primary-foreground/80 truncate">{user?.email}</p>
        </div>
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-2.5 text-sm text-primary-foreground/60 hover:text-primary-foreground hover:bg-primary-foreground/5 transition-all duration-200 w-full"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.5} />
          Sair
        </button>
      </div>
    </aside>
  );
}
