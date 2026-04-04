import { ExternalLink, ShieldCheck, ShieldAlert, Trash2 } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import SeverityBadge from './SeverityBadge';
import StatusBadge from './StatusBadge';

export default function IncidentCard({ incident, onDelete }) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <h3 className="text-sm font-semibold text-gray-900">{incident.title}</h3>
            {incident.verified ? (
              <span className="inline-flex items-center gap-0.5 text-xs text-green-600">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-0.5 text-xs text-amber-600">
                <ShieldAlert className="w-3.5 h-3.5" /> Unverified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <CategoryBadge category={incident.category} />
            <SeverityBadge severity={incident.severity} />
            <StatusBadge status={incident.status} />
            <span className="text-xs text-gray-400">{incident.date}</span>
          </div>
          <p className="text-sm text-gray-600 mb-2">{incident.description}</p>
          <a
            href={incident.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800"
          >
            <ExternalLink className="w-3 h-3" />
            {incident.source_name || incident.sourceName || 'Source'}
          </a>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(incident.id)}
            className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
