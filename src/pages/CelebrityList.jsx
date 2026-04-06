import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, AlertTriangle, ChevronRight } from 'lucide-react';
import { useCelebrities } from '../context/CelebrityContext';
import { CATEGORIES } from '../data/celebrities';
import CategoryBadge from '../components/CategoryBadge';

export default function CelebrityList() {
  const { celebrities, loading } = useCelebrities();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');

  const filtered = celebrities.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      categoryFilter === 'All' ||
      c.incidents.some((i) => i.category === categoryFilter);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-1">Not So Innocent</h1>
        <p className="text-sm text-gray-500">
          Exposing celebrity incidents, lawsuits, and controversies
        </p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search celebrities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="pl-9 pr-8 py-2 border border-gray-300 rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 appearance-none"
          >
            <option>All</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <StatCard label="Celebrities" value={celebrities.length} />
        <StatCard
          label="Total Incidents"
          value={celebrities.reduce((sum, c) => sum + c.incidents.length, 0)}
        />
        <StatCard
          label="Verified"
          value={celebrities.reduce(
            (sum, c) => sum + c.incidents.filter((i) => i.verified).length,
            0
          )}
        />
        <StatCard
          label="Unverified"
          value={celebrities.reduce(
            (sum, c) => sum + c.incidents.filter((i) => !i.verified).length,
            0
          )}
        />
      </div>

      {/* Celebrity Cards */}
      <div className="space-y-3">
        {loading && (
          <p className="text-center text-gray-400 py-12">Loading...</p>
        )}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-gray-400 py-12">No celebrities found.</p>
        )}
        {filtered.map((celeb) => (
          <Link
            key={celeb.id}
            to={`/celebrity/${celeb.id}`}
            className="block border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white no-underline"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm">
                  {celeb.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div className="text-left">
                  <h2 className="text-sm font-semibold text-gray-900">{celeb.name}</h2>
                  <p className="text-xs text-gray-500">{celeb.profession}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  {[...new Set(celeb.incidents.map((i) => i.category))].map((cat) => (
                    <CategoryBadge key={cat} category={cat} />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500">
                  <AlertTriangle className="w-4 h-4" />
                  {celeb.incidents.length}
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 text-center">
      <p className="text-2xl font-bold text-gray-900">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}
