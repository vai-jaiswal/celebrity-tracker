import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Plus } from 'lucide-react';
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
      <div className="max-w-6xl mx-auto px-4 py-12 text-center text-gray-500">
        Celebrity not found.{' '}
        <Link to="/" className="text-indigo-600 underline">
          Go back
        </Link>
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
        className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-4 no-underline"
      >
        <ArrowLeft className="w-4 h-4" /> Back to list
      </Link>

      {/* Celebrity Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xl">
          {celeb.name
            .split(' ')
            .map((n) => n[0])
            .join('')}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{celeb.name}</h1>
          <p className="text-sm text-gray-500">{celeb.profession}</p>
        </div>
      </div>

      {/* Filters + Add Button */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4 items-start sm:items-center justify-between">
        <div className="flex gap-2 flex-wrap">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option>All</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm bg-white"
          >
            <option>All</option>
            {STATUSES.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors"
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
          <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500" />
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
          <h2 className="text-sm font-semibold text-amber-700 uppercase tracking-wide mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
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
        <p className="text-center text-gray-400 py-8">No incidents match the current filters.</p>
      )}
    </div>
  );
}
