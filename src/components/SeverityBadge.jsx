const SEVERITY_STYLES = {
  Low: 'border-y2k-lime/50 text-y2k-lime bg-y2k-lime/10',
  Medium: 'border-y2k-yellow/50 text-y2k-yellow bg-y2k-yellow/10',
  High: 'border-y2k-orange/50 text-y2k-orange bg-y2k-orange/10',
  Critical: 'border-y2k-pink/50 text-y2k-pink bg-y2k-pink/10 animate-pulse',
};

export default function SeverityBadge({ severity }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded border text-xs font-bold tracking-wide uppercase ${
        SEVERITY_STYLES[severity] || 'border-white/20 text-white/60 bg-white/5'
      }`}
    >
      {severity}
    </span>
  );
}
