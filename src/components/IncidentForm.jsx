import { useState } from 'react';
import { CATEGORIES, SEVERITIES, STATUSES } from '../data/celebrities';

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
      className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3"
    >
      <h3 className="text-sm font-semibold text-gray-900">New Incident</h3>

      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Incident title"
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description..."
        rows={3}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          {CATEGORIES.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>

        <select
          name="severity"
          value={form.severity}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          {SEVERITIES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
        >
          {STATUSES.map((s) => (
            <option key={s}>{s}</option>
          ))}
        </select>

        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <input
          name="source"
          value={form.source}
          onChange={handleChange}
          placeholder="Source URL"
          required
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          name="sourceName"
          value={form.sourceName}
          onChange={handleChange}
          placeholder="Source name (e.g. Reuters)"
          className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          name="verified"
          checked={form.verified}
          onChange={handleChange}
          className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
        />
        Mark as verified record
      </label>

      <div className="flex gap-2 justify-end">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors font-medium"
        >
          Add Incident
        </button>
      </div>
    </form>
  );
}
