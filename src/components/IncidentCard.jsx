import { ExternalLink, ShieldCheck, ShieldAlert, Trash2 } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import SeverityBadge from './SeverityBadge';
import StatusBadge from './StatusBadge';

export default function IncidentCard({ incident, onDelete }) {
  return (
    <div className="glass-card rounded-2xl p-4 group">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <h3 className="text-sm font-heading font-bold text-white">{incident.title}</h3>
            {incident.verified ? (
              <span className="inline-flex items-center gap-1 text-xs text-y2k-lime font-semibold">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 text-xs text-y2k-yellow font-semibold">
                <ShieldAlert className="w-3.5 h-3.5" /> Unverified
              </span>
            )}
          </div>
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <CategoryBadge category={incident.category} />
            <SeverityBadge severity={incident.severity} />
            <StatusBadge status={incident.status} />
            <span className="text-xs text-white/30 font-body">{incident.date}</span>
          </div>
          <p className="text-sm text-white/60 mb-3 font-body leading-relaxed">{incident.description}</p>
          <a
            href={incident.source}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-y2k-cyan hover:text-y2k-pink transition-colors font-semibold"
          >
            <ExternalLink className="w-3 h-3" />
            {incident.source_name || incident.sourceName || 'Source'}
          </a>
        </div>
        {onDelete && (
          <button
            onClick={() => onDelete(incident.id)}
            className="p-1.5 text-white/20 hover:text-y2k-pink hover:bg-y2k-pink/10 rounded-lg transition-all opacity-0 group-hover:opacity-100"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
