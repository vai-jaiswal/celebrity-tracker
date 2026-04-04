import { Link, useLocation } from 'react-router-dom';
import { Shield, Users, PlusCircle } from 'lucide-react';

export default function Header() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
      pathname === path
        ? 'bg-indigo-100 text-indigo-700'
        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
    }`;

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-gray-900 no-underline">
          <Shield className="w-6 h-6 text-indigo-600" />
          CelebTracker
        </Link>
        <nav className="flex items-center gap-1">
          <Link to="/" className={linkClass('/')}>
            <Users className="w-4 h-4" />
            Celebrities
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
