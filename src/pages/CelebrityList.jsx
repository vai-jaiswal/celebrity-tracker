import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, AlertTriangle, ChevronRight, Sparkles, Star } from 'lucide-react';
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
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Hero */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 mb-3">
          <Star className="w-5 h-5 text-y2k-yellow fill-y2k-yellow" />
          <Star className="w-3 h-3 text-y2k-pink fill-y2k-pink" />
          <Star className="w-4 h-4 text-y2k-cyan fill-y2k-cyan" />
        </div>
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold tracking-tight bg-gradient-to-r from-y2k-pink via-y2k-purple to-y2k-cyan bg-clip-text text-transparent mb-2">
          Not So Innocent
        </h1>
        <p className="text-white/40 text-sm font-body tracking-wide uppercase">
          Exposing celebrity incidents, lawsuits, and controversies
        </p>
        <div className="inline-flex items-center gap-2 mt-3">
          <Star className="w-4 h-4 text-y2k-cyan fill-y2k-cyan" />
          <Star className="w-3 h-3 text-y2k-pink fill-y2k-pink" />
          <Star className="w-5 h-5 text-y2k-yellow fill-y2k-yellow" />
        </div>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-y2k-pink" />
          <input
            type="text"
            placeholder="Search celebrities..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-y2k-pink/50 focus:shadow-[0_0_15px_rgba(255,45,149,0.2)] transition-all font-body"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-y2k-purple" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="pl-9 pr-8 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-y2k-purple/50 appearance-none font-body cursor-pointer"
          >
            <option value="All">All</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        <StatCard label="Celebrities" value={celebrities.length} color="from-y2k-pink to-y2k-purple" />
        <StatCard
          label="Total Incidents"
          value={celebrities.reduce((sum, c) => sum + c.incidents.length, 0)}
          color="from-y2k-purple to-y2k-cyan"
        />
        <StatCard
          label="Verified"
          value={celebrities.reduce((sum, c) => sum + c.incidents.filter((i) => i.verified).length, 0)}
          color="from-y2k-cyan to-y2k-lime"
        />
        <StatCard
          label="Unverified"
          value={celebrities.reduce((sum, c) => sum + c.incidents.filter((i) => !i.verified).length, 0)}
          color="from-y2k-orange to-y2k-yellow"
        />
      </div>

      {/* Celebrity Cards */}
      <div className="space-y-3">
        {loading && (
          <p className="text-center text-white/30 py-12 font-body">
            <Sparkles className="inline w-4 h-4 mr-2 animate-spin" />
            Loading...
          </p>
        )}
        {!loading && filtered.length === 0 && (
          <p className="text-center text-white/30 py-12 font-body">No celebrities found.</p>
        )}
        {filtered.map((celeb) => (
          <Link
            key={celeb.id}
            to={`/celebrity/${celeb.id}`}
            className="block glass-card rounded-2xl p-4 no-underline group"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-y2k-pink to-y2k-purple flex items-center justify-center text-white font-heading font-bold text-sm shadow-[0_0_15px_rgba(255,45,149,0.3)] group-hover:shadow-[0_0_25px_rgba(255,45,149,0.5)] transition-shadow">
                  {celeb.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div className="text-left">
                  <h2 className="text-sm font-heading font-bold text-white group-hover:text-y2k-pink transition-colors">
                    {celeb.name}
                  </h2>
                  <p className="text-xs text-white/40 font-body">{celeb.profession}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 flex-wrap justify-end">
                  {[...new Set(celeb.incidents.map((i) => i.category))].map((cat) => (
                    <CategoryBadge key={cat} category={cat} />
                  ))}
                </div>
                <div className="flex items-center gap-1 text-sm text-y2k-yellow font-bold font-heading">
                  <AlertTriangle className="w-4 h-4" />
                  {celeb.incidents.length}
                </div>
                <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-y2k-pink group-hover:translate-x-0.5 transition-all" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function StatCard({ label, value, color }) {
  return (
    <div className="glass-card rounded-2xl p-4 text-center">
      <p className={`text-3xl font-heading font-extrabold bg-gradient-to-r ${color} bg-clip-text text-transparent`}>
        {value}
      </p>
      <p className="text-xs text-white/40 font-body uppercase tracking-wider mt-1">{label}</p>
    </div>
  );
}
