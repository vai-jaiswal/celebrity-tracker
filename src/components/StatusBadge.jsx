const STATUS_STYLES = {
  Alleged: 'bg-gray-100 text-gray-600',
  'Under Investigation': 'bg-blue-100 text-blue-700',
  Confirmed: 'bg-red-100 text-red-700',
  Resolved: 'bg-green-100 text-green-700',
  Dismissed: 'bg-gray-100 text-gray-500 line-through',
};

export default function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
        STATUS_STYLES[status] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {status}
    </span>
  );
}
