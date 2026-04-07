import { X, ShieldCheck, ShieldAlert, ExternalLink, AlertTriangle } from 'lucide-react';
import CategoryBadge from './CategoryBadge';
import SeverityBadge from './SeverityBadge';
import StatusBadge from './StatusBadge';

export default function IncidentModal({ celebrity, onClose }) {
  const incidents = celebrity.incidents || [];
  const verified = incidents.filter((i) => i.verified);
  const unverified = incidents.filter((i) => !i.verified);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />
      <div
        className="relative w-full max-w-xl max-h-[80vh] overflow-y-auto glass-card rounded-3xl shadow-[0_0_80px_rgba(255,45,149,0.2)]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 bg-y2k-dark/90 backdrop-blur-xl rounded-t-3xl border-b border-white/10 p-5">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-white/30 hover:text-white hover:bg-white/10 rounded-lg transition-all"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-heading font-extrabold text-xl"
              style={{
                background: `linear-gradient(135deg, ${celebrity.colors?.[0] || '#ff2d95'}, ${celebrity.colors?.[1] || '#b24bf3'})`,
                boxShadow: `0 0 30px ${celebrity.colors?.[0] || '#ff2d95'}60`,
              }}
            >
              {celebrity.name.split(' ').map((n) => n[0]).join('')}
            </div>
            <div>
              <h2 className="text-xl font-heading font-extrabold text-white">{celebrity.name}</h2>
              <p className="text-sm text-white/40 font-body">{celebrity.profession}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-y2k-yellow font-bold flex items-center gap-1">
                  <AlertTriangle className="w-3 h-3" />
                  {incidents.length} incident{incidents.length !== 1 ? 's' : ''}
                </span>
                {verified.length > 0 && (
                  <span className="text-xs text-y2k-lime flex items-center gap-0.5">
                    <ShieldCheck className="w-3 h-3" />
                    {verified.length} verified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 space-y-4">
          {incidents.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-white/30 font-body text-sm">No incidents recorded... yet.</p>
              <p className="text-white/20 font-body text-xs mt-1">They might be dancing their way out of trouble</p>
            </div>
          ) : (
            <>
              {/* Verified */}
              {verified.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-y2k-lime mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-y2k-lime shadow-[0_0_6px_rgba(198,241,53,0.6)]" />
                    Verified Records
                  </h3>
                  <div className="space-y-2">
                    {verified
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((inc) => (
                        <IncidentRow key={inc.id} incident={inc} />
                      ))}
                  </div>
                </div>
              )}

              {/* Unverified */}
              {unverified.length > 0 && (
                <div>
                  <h3 className="text-[10px] font-heading font-bold uppercase tracking-[0.2em] text-y2k-yellow mb-3 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-y2k-yellow shadow-[0_0_6px_rgba(255,225,86,0.6)]" />
                    Allegations / Unverified
                  </h3>
                  <div className="space-y-2">
                    {unverified
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((inc) => (
                        <IncidentRow key={inc.id} incident={inc} />
                      ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function IncidentRow({ incident }) {
  return (
    <div className="bg-white/5 rounded-xl p-3 hover:bg-white/8 transition-colors border border-white/5">
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h4 className="text-sm font-heading font-bold text-white">{incident.title}</h4>
        {incident.verified ? (
          <ShieldCheck className="w-4 h-4 text-y2k-lime flex-shrink-0" />
        ) : (
          <ShieldAlert className="w-4 h-4 text-y2k-yellow flex-shrink-0" />
        )}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap mb-2">
        <CategoryBadge category={incident.category} />
        <SeverityBadge severity={incident.severity} />
        <StatusBadge status={incident.status} />
        <span className="text-[10px] text-white/25 font-body">{incident.date}</span>
      </div>
      <p className="text-xs text-white/50 font-body leading-relaxed mb-2">{incident.description}</p>
      <a
        href={incident.source}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-[10px] text-y2k-cyan hover:text-y2k-pink transition-colors font-semibold"
      >
        <ExternalLink className="w-3 h-3" />
        {incident.source_name || incident.sourceName || 'Source'}
      </a>
    </div>
  );
}
