import { useState } from 'react';
import { CATEGORIES, SEVERITIES, STATUSES } from '../data/celebrities';

const inputClass =
  'w-full px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-y2k-pink/50 focus:shadow-[0_0_15px_rgba(255,45,149,0.15)] transition-all font-body';

const selectClass =
  'px-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white font-body appearance-none cursor-pointer focus:outline-none focus:border-y2k-pink/50';

export default function IncidentForm({ onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    category: 'Controversy',
    severity: 'Medium',
    status: 'Alleged',
    verified: false,
    date: new Date().toISOString().split('T')[0],
    source: '',
    sourceName: '',
    description: '',
  });

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card rounded-2xl p-5 space-y-4"
    >
      <h3 className="text-sm font-heading font-bold bg-gradient-to-r from-y2k-pink to-y2k-purple bg-clip-text text-transparent">
        New Incident
      </h3>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Incident title"
        required
        className={inputClass}
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description..."
        rows={3}
        required
        className={`${inputClass} resize-none`}
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <select name="category" value={form.category} onChange={handleChange} className={selectClass}>
          {CATEGORIES.map((c) => (<option key={c}>{c}</option>))}
        </select>
        <select name="severity" value={form.severity} onChange={handleChange} className={selectClass}>
          {SEVERITIES.map((s) => (<option key={s}>{s}</option>))}
        </select>
        <select name="status" value={form.status} onChange={handleChange} className={selectClass}>
          {STATUSES.map((s) => (<option key={s}>{s}</option>))}
        </select>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className={inputClass}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="source"
          value={form.source}
          onChange={handleChange}
          placeholder="Source URL"
          required
          className={inputClass}
        />
        <input
          name="sourceName"
          value={form.sourceName}
          onChange={handleChange}
          placeholder="Source name (e.g. Reuters)"
          className={inputClass}
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-white/60 font-body cursor-pointer">
        <input
          type="checkbox"
          name="verified"
          checked={form.verified}
          onChange={handleChange}
          className="rounded border-white/20 bg-white/5 text-y2k-pink focus:ring-y2k-pink"
        />
        Mark as verified record
      </label>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-white/50 border border-white/10 rounded-xl hover:bg-white/5 transition-colors font-body"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="neon-btn px-4 py-2 rounded-xl text-sm font-heading font-bold"
        >
          Add Incident
        </button>
      </div>
    </form>
  );
}
