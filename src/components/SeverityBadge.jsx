const SEVERITY_STYLES = {
  Low: 'bg-green-100 text-green-700',
  Medium: 'bg-yellow-100 text-yellow-700',
  High: 'bg-orange-100 text-orange-700',
  Critical: 'bg-red-100 text-red-800 font-semibold',
};

export default function SeverityBadge({ severity }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
        SEVERITY_STYLES[severity] || 'bg-gray-100 text-gray-700'
      }`}
    >
      {severity}
    </span>
  );
}
