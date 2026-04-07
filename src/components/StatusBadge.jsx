import { Circle } from 'lucide-react';

const STATUS_CONFIG = {
  Alleged: { color: 'text-white/50', dot: 'bg-white/50' },
  'Under Investigation': { color: 'text-y2k-cyan', dot: 'bg-y2k-cyan' },
  Confirmed: { color: 'text-y2k-pink', dot: 'bg-y2k-pink' },
  Resolved: { color: 'text-y2k-lime', dot: 'bg-y2k-lime' },
  Dismissed: { color: 'text-white/30 line-through', dot: 'bg-white/30' },
};

export default function StatusBadge({ status }) {
  const config = STATUS_CONFIG[status] || { color: 'text-white/50', dot: 'bg-white/50' };
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-medium ${config.color}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {status}
    </span>
  );
}
