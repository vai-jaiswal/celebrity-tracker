import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Star } from 'lucide-react';
import { useCelebrities } from '../context/CelebrityContext';
import { CATEGORIES, STATUSES } from '../data/celebrities';
import IncidentCard from '../components/IncidentCard';
import IncidentForm from '../components/IncidentForm';

export default function CelebrityDetail() {
  const { id } = useParams();
  const { celebrities, addIncident, deleteIncident } = useCelebrities();
  const [showForm, setShowForm] = useState(false);
  const [filterCategory, setFilterCategory] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');

  const celeb = celebrities.find((c) => c.id === id);
  if (!celeb) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-white/40 font-body">
        Celebrity not found.{' '}
        <Link to="/" className="text-y2k-pink underline">Go back</Link>
      </div>
    );
  }

  const incidents = celeb.incidents.filter((i) => {
    const matchCat = filterCategory === 'All' || i.category === filterCategory;
    const matchStatus = filterStatus === 'All' || i.status === filterStatus;
    return matchCat && matchStatus;
  });

  const verifiedIncidents = incidents.filter((i) => i.verified);
  const unverifiedIncidents = incidents.filter((i) => !i.verified);

  function handleAddIncident(data) {
    addIncident(celeb.id, data);
    setShowForm(false);
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <Link
        to="/"
        className="inline-flex items-center gap-1 text-sm text-white/40 hover:text-y2k-pink mb-6 no-underline transition-colors font-body"
      >
        <ArrowLeft className="w-4 h-4" /> Back to list
      </Link>

      {/* Celebrity Header */}
      <div className="glass-card rounded-2xl p-6 mb-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-y2k-pink to-y2k-purple flex items-center justify-center text-white font-heading font-extrabold text-xl shadow-[0_0_25px_rgba(255,45,149,0.4)]">
            {celeb.name.split(' ').map((n) => n[0]).join('')}
          </div>
          <div>
            <h1 className="text-2xl font-heading font-extrabold bg-gradient-to-r from-y2k-pink to-y2k-purple bg-clip-text text-transparent">
              {celeb.name}
            </h1>
            <p className="text-sm text-white/40 font-body">{celeb.profession}</p>
          </div>
          <div className="ml-auto flex items-center gap-1">
            <Star className="w-4 h-4 text-y2k-yellow fill-y2k-yellow" />
            <Star className="w-3 h-3 text-y2k-pink fill-y2k-pink" />
            <Star className="w-4 h-4 text-y2k-cyan fill-y2k-cyan" />
          </div>
        </div>
      </div>

      {/* Filters + Add Button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-body appearance-none cursor-pointer focus:outline-none focus:border-y2k-pink/50"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-body appearance-none cursor-pointer focus:outline-none focus:border-y2k-pink/50"
          >
            <option value="All">All Statuses</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="neon-btn inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-heading font-bold"
        >
          <Plus className="w-4 h-4" />
          Add Incident
        </button>
      </div>

      {/* Incident Form */}
      {showForm && (
        <div className="mb-6">
          <IncidentForm onSubmit={handleAddIncident} onCancel={() => setShowForm(false)} />
        </div>
      )}

      {/* Verified Records */}
      {verifiedIncidents.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-heading font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-y2k-lime">
            <span className="w-2 h-2 rounded-full bg-y2k-lime shadow-[0_0_8px_rgba(198,241,53,0.5)]" />
            Verified Records ({verifiedIncidents.length})
          </h2>
          <div className="space-y-3">
            {verifiedIncidents
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  onDelete={(incId) => deleteIncident(celeb.id, incId)}
                />
              ))}
          </div>
        </section>
      )}

      {/* Allegations / Unverified */}
      {unverifiedIncidents.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-heading font-bold uppercase tracking-widest mb-3 flex items-center gap-2 text-y2k-yellow">
            <span className="w-2 h-2 rounded-full bg-y2k-yellow shadow-[0_0_8px_rgba(255,225,86,0.5)]" />
            Allegations / Unverified ({unverifiedIncidents.length})
          </h2>
          <div className="space-y-3">
            {unverifiedIncidents
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((incident) => (
                <IncidentCard
                  key={incident.id}
                  incident={incident}
                  onDelete={(incId) => deleteIncident(celeb.id, incId)}
                />
              ))}
          </div>
        </section>
      )}

      {incidents.length === 0 && (
        <p className="text-center text-white/30 py-8 font-body">No incidents match the current filters.</p>
      )}
    </div>
  );
}
