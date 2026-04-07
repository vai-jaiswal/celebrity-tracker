import { Link, useLocation } from 'react-router-dom';
import { Sparkles, Users, PlusCircle } from 'lucide-react';

export default function Header() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
      pathname === path
        ? 'bg-gradient-to-r from-y2k-pink to-y2k-purple text-white shadow-[0_0_15px_rgba(255,45,149,0.4)]'
        : 'text-white/60 hover:text-white hover:bg-white/10'
    }`;

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-y2k-darker/80 border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-y2k-pink to-y2k-purple flex items-center justify-center shadow-[0_0_15px_rgba(255,45,149,0.4)] group-hover:shadow-[0_0_25px_rgba(255,45,149,0.6)] transition-shadow">
            <Sparkles className="w-4 h-4 text-white" />
          </div>
          <span className="text-xl font-heading font-extrabold tracking-tight bg-gradient-to-r from-y2k-pink via-y2k-purple to-y2k-cyan bg-clip-text text-transparent">
            Not So Innocent
          </span>
        </Link>
        <nav className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-semibold text-white/60 hover:text-white hover:bg-white/10 transition-all duration-300">
            <Sparkles className="w-4 h-4" />
            Dance Floor
          </Link>
          <Link to="/list" className={linkClass('/list')}>
            <Users className="w-4 h-4" />
            List View
          </Link>
          <Link to="/add" className={linkClass('/add')}>
            <PlusCircle className="w-4 h-4" />
            Add New
          </Link>
        </nav>
      </div>
    </header>
  );
}
